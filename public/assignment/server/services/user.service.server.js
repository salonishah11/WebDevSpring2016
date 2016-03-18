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
        user = model.createUser(user);
        res.json(user);
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
        user = model.findUserByID(userId);
        res.json(user);
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
        console.log(credentials);
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUserByID(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;
        users = model.updateUser(userId, updatedUser);
        res.json(users);
    }
    
    function deleteUserById(req, res){
        var userId = req.params.id;
        var users = model.deleteUserById(userId);
        res.json(users);
    }
};