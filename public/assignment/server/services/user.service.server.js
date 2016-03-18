module.exports = function(app, model) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserByID);
    app.get("/api/assignment/user/:username", findUserByUsername);
    app.get("/api/assignment/user/:username/:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserByID);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        users = model.createUser(user);
        req.session.currentUser = user;
        res.json(users);
    }

    function findAllUsers(req, res){
        var users = model.findAllUsers();
        res.json(users);
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
        req.session.currentUser = user;
        res.json(user);
    }

    function updateUserByID(req, res) {
        var userId = req.params.id;
        users = model.updateUserByID(userId);
        res.json(users);
    }
    
    function deleteUserById(req, res){
        var userId = req.params.id;
        var users = model.deleteUserById(userId);
        res.json(users);
    }
};