module.exports = function(app, model) {

    app.post("/api/project/story", createStory);
    app.get("/api/project/story/user/:userId", findAllStoriesByUserId);
    app.get("/api/project/story", findAllStories);
    app.delete("/api/project/story/:storyId", deleteStoryById);
    app.put("/api/project/story/:storyId", updateStoryById);

    function createStory(req, res) {
        var story = req.body;
        model
            .createStory(story)
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


    function findAllStoriesByUserId(req, res) {
        var userId = req.params.userId;
        model
            .findAllStoriesByUserId(userId)
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


    function findAllStories(req, res) {
        model
            .findAllStories()
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


    function deleteStoryById(req, res){
        var storyId = req.params.storyId;
        model
            .deleteStoryById(storyId)
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


    function updateStoryById(req, res) {
        var storyId = req.params.storyId;
        var updatedStory = req.body;
        model
            .updateStoryById(storyId, updatedStory)
            .then(
                // login user if promise resolved
                function(doc){
                    res.json(updatedStory);
                },
                // send error if promise rejected
                function(err ){
                    res.status(400).send(err);
                }
            );
        //res.json(users);
    }

};