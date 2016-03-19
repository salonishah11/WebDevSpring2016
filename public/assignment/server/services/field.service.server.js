module.exports = function(app, model) {

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);


    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        //console.log("inside server service " + userId);
        fields = model.getFieldsForForm(formId);
        res.json(fields);
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        field = model.getFieldForForm(formId, fieldId);
        res.json(field);
    }

    function deleteFieldFromForm(req, res){
        //console.log("inside server service");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fields = model.deleteFieldFromForm(formId, fieldId);
        res.json(fields);
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        newField._id = (new Date()).getTime();
        field = model.createFieldForForm(formId, newField);
        res.json(field);
    }

    function updateField(req, res) {
        //console.log("inside server service");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        field = model.updateField(formId, fieldId, updatedField);
        res.json(field);
    }
};