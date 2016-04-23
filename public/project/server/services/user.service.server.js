var passport         = require('passport');
var bcrypt           = require('bcrypt-nodejs');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, model) {

    var auth = authorized;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/project/login', passport.authenticate('local'), login);

    app.post("/api/project/user",                           createUser);
    app.get("/api/project/user",                      auth, findAllUsers);
    app.get("/api/project/user/:id",                  auth, findUserByID);
    app.get("/api/project/user?username=username",    auth, findUserByUsername);
    app.put("/api/project/user/:id",                  auth, updateUserByID);
    app.delete("/api/project/user/:id",               auth, deleteUserById);
    app.get("/api/project/user/shelterId/:shelterId", auth, findUserByShelterId);

    app.get("/api/project/shelterId",                       findAvailableShelterId);
    app.post("/api/project/shelterId/new",                  addShelterId);
    app.post("/api/project/shelterId/update",               updateShelterId);

    app.get("/api/project/loggedin", loggedIn);
    app.post("/api/project/logout", logout);


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
            .findUserByID(user._id)
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
        // .findUserByCredentials({username: username, password: password})
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if (!user) { return done(null, false); }
                    // return done(null, user);
                    if(user && bcrypt.compareSync(password, user.password)){
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    
    
    function createUser(req, res) {
        var newUser = req.body;
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
        //console.log("inside server service")
        if(req.query.username){
            findUserByUsername(req, res);
        }
        else{
            //console.log("inside else");
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
            //res.json(users);
        }
    }

    function findUserByID(req, res) {
        var userId = req.params.id;
        model
            .findUserByID(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
        //res.json(user);
    }
    
    function findUserByShelterId(req, res) {
        var shelterId = req.params.shelterId;
        model
            .findUserByShelterId(shelterId)
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
        //res.json(user);
    }

    function updateUserByID(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;
        updatedUser.password = bcrypt.hashSync(updatedUser.password);
        
        model
            .updateUser(userId, updatedUser)
            .then(
                // login user if promise resolved
                function(doc){
                    req.user = updatedUser;
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
        //res.json(users);
    }

    function deleteUserById(req, res){
        var userId = req.params.id;
        model
            .deleteUserById(userId)
            .then(
                function(doc){
                    // console.log("after model" + doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
        //res.json(users);
    }


    function findAvailableShelterId(req, res) {
        model
            .findAvailableShelterId()
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


    function addShelterId(req, res) {
        var newShelterObj = req.body;

        model
            .addShelterId(newShelterObj)
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


    function updateShelterId(req, res) {
        var updatedShelterObj = req.body;
        
        model
            .updateShelterId(updatedShelterObj)
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