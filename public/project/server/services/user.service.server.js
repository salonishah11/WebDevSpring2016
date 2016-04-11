module.exports = function(app, model) {

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:id", findUserByID);
    app.get("/api/project/user?username=username", findUserByUsername);
    app.get("/api/project/user?username=username&password=password", findUserByCredentials);
    app.put("/api/project/user/:id", updateUserByID);
    app.delete("/api/project/user/:id", deleteUserById);
    app.get("/api/project/loggedin", loggedIn);
    app.post("/api/project/logout", logout);
    app.get("/api/project/user/shelterId/:shelterId", findUserByShelterId);

    function createUser(req, res) {
        var user = req.body;
        model
            .createUser(user)
            .then(
                function(doc){
                    req.session.currentProjectUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res){
        //console.log("inside server service")
        if(req.query.username && req.query.password){
            findUserByCredentials(req, res);
        }
        else if(req.query.username){
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

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        //console.log(credentials);
        model
            .findUserByCredentials(credentials)
            .then(
                // login user if promise resolved
                function(doc){
                    req.session.currentProjectUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
        // res.json(user);
    }

    function updateUserByID(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;
        model
            .updateUser(userId, updatedUser)
            .then(
                // login user if promise resolved
                function(doc){
                    req.session.currentProjectUser = doc;
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
                    console.log("after model" + doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
        //res.json(users);
    }

    function loggedIn(req, res) {
        res.json(req.session.currentProjectUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
};