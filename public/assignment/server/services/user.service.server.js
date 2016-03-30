module.exports = function(app, model) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserByID);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserByID);
    app.delete("/api/assignment/user/:id", deleteUserById);

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

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        model
            .findUserByCredentials(credentials)
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
        model
            .updateUser(userId, updatedUser)
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
};