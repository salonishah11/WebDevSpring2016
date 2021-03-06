module.exports = function(app, model) {

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/assignment/:formId/field", sortField);


    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        //console.log("inside server service " + userId);
        model
            .getFieldsForForm(formId)
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

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .getFieldForForm(formId, fieldId)
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

    function deleteFieldFromForm(req, res){
        //console.log("inside server service");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .deleteFieldFromForm(formId, fieldId)
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

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        
        model
            .createFieldForForm(formId, newField)
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

    function updateField(req, res) {
        //console.log("inside server service");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        model
            .updateField(formId, fieldId, updatedField)
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
    
    function sortField(req, res) {
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {
            model
                .sortField(formId, startIndex, endIndex)
                .then(
                    function(stat) {
                        return model.getFieldsForForm(formId);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(doc) {
                        res.json(doc);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }
};