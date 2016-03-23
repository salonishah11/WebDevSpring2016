module.exports = function(app, model) {

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:id", findUserByID);
    app.get("/api/project/user?username=username", findUserByUsername);
    app.get("/api/project/user?username=username&password=password", findUserByCredentials);
    app.put("/api/project/user/:id", updateUserByID);
    app.delete("/api/project/user/:id", deleteUserById);

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
        //console.log("inside server service")
        if(req.query.username && req.query.password){
            findUserByCredentials(req, res);
        }
        else if(req.query.username){
            findUserByUsername(req, res);
        }
        else{
            //console.log("inside else");
            var users = model.findAllUsers();
            res.json(users);
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

    function findUserByUsername(req, res) {
        var username = req.query.username;
        user = model.findUserByUsername(username);
        res.json(user);
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
        var users = model.deleteUserById(userId);
        res.json(users);
    }
};