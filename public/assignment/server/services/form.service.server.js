module.exports = function(app, model) {

    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormByID);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormByID);


    function findFormByUserId(req, res) {
        var userId = req.params.userId;
        //console.log("inside server service " + userId);
        forms = model.findFormByUserId(userId);
        res.json(forms);
    }

    function findFormByID(req, res) {
        var formId = req.params.formId;
        form = model.findFormByID(formId);
        res.json(form);
    }

    function deleteFormById(req, res){
        //console.log("inside server service");
        var formId = req.params.formId;
        var forms = model.deleteForm(formId);
        res.json(forms);
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        forms = model.createForm(userId, form);
        res.json(forms);
    }

    function updateFormByID(req, res) {
        //console.log("inside server service");
        var formId = req.params.formId;
        var updatedForm = req.body;
        form = model.updateForm(formId, updatedForm);
        res.json(form);
    }
};