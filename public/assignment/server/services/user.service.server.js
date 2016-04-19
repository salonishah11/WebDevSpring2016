// var passport         = require('passport');
// var bcrypt           = require('bcrypt-nodejs');
// var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, model) {

    // var auth = authorized;
    //
    // passport.use(new LocalStrategy(localStrategy));
    // passport.serializeUser(serializeUser);
    // passport.deserializeUser(deserializeUser);

    // app.post('/api/assignment/login', passport.authenticate('local'), login);

    // app.post("/api/assignment/admin/user",                    auth, createUser);
    // app.get("/api/assignment/admin/user",                     auth, findAllUsers);
    // app.put("/api/assignment/user/:id",                       auth, updateUserByID);
    // app.put("/api/assignment/admin/user/:id",                 auth, updateUserAdmin);
    // app.delete("/api/assignment/admin/user/:id",              auth, deleteUserById);
    // app.get("/api/assignment/user?username=username",         auth, findUserByUsername);

    app.post("/api/assignment/register",                register);
    app.get("/api/assignment/admin/user/:id",           findUserById);
    app.get("/api/assignment/loggedin",                 loggedIn);
    app.post("/api/assignment/logout",                  logout);
    // app.post("/api/assignment/register", register);
    //app.get("/api/assignment/user?username=username&password=password", auth, findUserByCredentials);


    // function authorized (req, res, next) {
    //     if (!req.isAuthenticated()) {
    //         res.send(401);
    //     } else {
    //         next();
    //     }
    // }
    //
    // function serializeUser(user, done) {
    //     done(null, user);
    // }
    //
    // function deserializeUser(user, done) {
    //     model
    //         .findUserById(user._id)
    //         .then(
    //             function (user) {
    //                 done(null, user);
    //             },
    //             function (err) {
    //                 done(err, null);
    //             }
    //         );
    // }
    //
    // function localStrategy(username, password, done) {
    //     model
    //         // .findUserByCredentials({username: username, password: password})
    //         .findUserByUsername(username)
    //         .then(
    //             function(user) {
    //                 // if (!user) { return done(null, false); }
    //                 // return done(null, user);
    //                 if(user && bcrypt.compareSync(password, user.password)){
    //                     return done(null, user);
    //                 }
    //                 return done(null, false);
    //             },
    //             function(err) {
    //                 if (err) { return done(err); }
    //             }
    //         );
    // }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        // create a new user
                        return model.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return model.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return model.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }


    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        model
            .findUserByUsername(newUser.username)
            .then(function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res){
        if(req.query.username){
            findUserByUsername(req, res);
        }
        else{
            if(isAdmin(req.user)) {
                model
                    .findAllUsers()
                    .then(
                        function(doc){
                            res.json(doc);
                        },
                        // send error if promise rejected
                        function(err ){
                            res.status(400).send(err);
                        }
                    );
            } else {
                res.status(403);
            }
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        model
            .findUserById(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .findUserByUsername(username)
            .then(
                function(doc){
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
    }


    function updateUserByID(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;
        updatedUser.password = bcrypt.hashSync(updatedUser.password);

        model
            .updateUser(userId, updatedUser)
            .then(
                function(doc){
                    req.user = updatedUser;
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
    }


    function updateUserAdmin(req, res) {
        var newUser = req.body;

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        }
        else {
            newUser.roles = ["student"];
        }

        model
            .updateUser(req.params.id, newUser)
            .then(function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )

    }

    function deleteUserById(req, res){
        var userId = req.params.id;

        if(isAdmin(req.user)) {
            model
                .deleteUser(userId)
                .then(
                    function(user){
                        return model.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function loggedIn(req, res) {
        // res.json(req.session.currentUser);
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {
        // req.session.destroy();
        // res.sendStatus(200);

        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function isAdmin(user) {
        // console.log(user.roles);
        if(user.roles.indexOf("admin") >= 0) {
            return true;
        }
        return false;
    }

};