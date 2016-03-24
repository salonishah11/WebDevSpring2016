module.exports = function(app, model) {

    app.post("/api/project/animal", createAnimal);
    app.get("/api/project/animal", findAllUsers);
    app.put("/api/project/animal/:id", updateUserByID);
    app.delete("/api/project/animal/:id", deleteUserById);

    function createAnimal(req, res) {
        var animal = req.body;
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
};