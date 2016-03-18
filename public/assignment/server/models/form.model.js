var mock = require("./form.mock.json");

module.exports = function() {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByID: findFormByID,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormByUserId: findFormByUserId
    };
    return api;

    function createForm(userId, newForm){
        newForm._id = (new Date()).getTime();
        newForm.userId = userId;
        mock.push(newForm);
        return mock;
    }

    function findAllForms(){
        return mock;
    }

    function findFormByID(formId){
        console.log(formId);
        for(var f in mock){
            if(mock[f]._id == formId){
                return mock[f];
            }
        }
        return null;
    }

    function updateForm(formId, updatedForm){
        //console.log("inside model " + formId);
        for(var f in mock){
            if(mock[f]._id == formId){
                mock[f] = updatedForm;
                //console.log(mock[f]);
                return mock[f];
            }
        }
        return null;
    }

    function deleteForm(formID){
        //console.log("inside model " + formID);
        for(var f in mock){
            if(formID == mock[f]._id){
                //console.log("inside if");
                mock.splice(f, 1);
                return mock;
            }
        }
        return null;
    }

    function findFormByTitle(title){
        for(var f in mock){
            if(mock[f].title === title){
                return mock[f];
            }
        }
        return null;
    }
    
    function findFormByUserId(userId) {
        var userForms = [];
        for(var f in mock){
            if(mock[f].userId == userId){
                //console.log("inside if" + mock[f]);
                userForms.push(mock[f]);
            }
        }
        //console.log(userId);
        return userForms;
    }
};