module.exports = function(app, model) {

    app.post("/api/project/adoptionRequest", createRequest);
    app.get("/api/project/adoptionRequest/user/:userId", findAllRequestsByUserId);
    app.get("/api/project/adoptionRequest/org/:shelterId", findAllRequestsByShelterId);
    app.get("/api/project/adoptionRequest/request/:requestId", findRequestById);
    app.delete("/api/project/adoptionRequest/request/:requestId", deleteRequestById);
    app.put("/api/project/adoptionRequest/request/:requestId", updateRequestById);

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
    

    function findAllRequestsByShelterId(req, res) {
        var shelterId = req.params.shelterId;
        model
            .findAllRequestsByShelterId(shelterId)
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
    
    
    function findRequestById(req, res){
        var requestId = req.params.requestId;
        model
            .findRequestById(requestId)
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


    function updateRequestById(req, res){
        var requestId = req.params.requestId;
        var updatedRequest = req.body;
        model
            .updateRequestById(requestId, updatedRequest)
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