module.exports = function(app, model) {

    app.post("/api/project/adoptionRequest", createRequest);
    app.get("/api/project/adoptionRequest/user/:userId", findAllRequestsByUserId);
    app.delete("/api/project/adoptionRequest/request/:requestId", deleteRequestById);

    function createRequest(req, res) {
        var request = req.body;
        model
            .createRequest(request)
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


    function findAllRequestsByUserId(req, res) {
        var userId = req.params.userId;
        model
            .findAllRequestsByUserId(userId)
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


    function deleteRequestById(req, res){
        var requestId = req.params.requestId;
        model
            .deleteRequestById(requestId)
            .then(
                function(doc){
                    //console.log("after model" + doc);
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