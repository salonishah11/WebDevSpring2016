var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, model) {

    var auth = authorized;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/assignment/login', passport.authenticate('local'), login);

    app.post("/api/assignment/user", auth, createUser);
    app.get("/api/assignment/user", auth, findAllUsers);
    app.put("/api/assignment/user/:id", auth, updateUserByID);
    app.delete("/api/assignment/user/:id", auth, deleteUserById);

    app.get("/api/assignment/user/:id", findUserById);
    // app.post("/api/assignment/register", register);
    app.get("/api/assignment/user?username=username", auth, findUserByUsername);
    //app.get("/api/assignment/user?username=username&password=password", auth, findUserByCredentials);
    app.get("/api/assignment/loggedin", loggedIn);
    app.post("/api/assignment/logout", logout);


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        model
            .createUser(user)
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

    function findAllUsers(req, res){
        if(req.query.username && req.query.password){
            findUserByCredentials(req, res);
        }
        else if(req.query.username){
            findUserByUsername(req, res);
        }
        else{
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

    // function findUserByCredentials(req, res) {
    //     var credentials = {
    //         username: req.query.username,
    //         password: req.query.password
    //     };
    //     model
    //         .findUserByCredentials(credentials)
    //         .then(
    //             function(doc){
    //                 req.session.currentUser = doc;
    //                 res.json(doc);
    //             },
    //             // send error if promise rejected
    //             function(err ){
    //                 res.status(400).send(err);
    //             }
    //         );
    // }

    function updateUserByID(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;
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

    function deleteUserById(req, res){
        var userId = req.params.id;
        model
            .deleteUserById(userId)
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
};