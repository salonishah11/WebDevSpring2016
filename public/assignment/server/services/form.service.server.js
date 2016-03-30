module.exports = function(app, model) {

    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormByID);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormByID);


    function findFormByUserId(req, res) {
        var userId = req.params.userId;
        //console.log("inside server service " + userId);
        model
            .findFormByUserId(userId)
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

    function findFormByID(req, res) {
        var formId = req.params.formId;
        model
            .findFormByID(formId)
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

    function deleteFormById(req, res){
        //console.log("inside server service");
        var formId = req.params.formId;
        model
            .deleteForm(formId)
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

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        model
            .createForm(userId, form)
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

    function updateFormByID(req, res) {
        //console.log("inside server service");
        var formId = req.params.formId;
        var updatedForm = req.body;
        model
            .updateForm(formId, updatedForm)
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