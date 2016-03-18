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

    function createForm(newForm){
        newForm._id = (new Date()).getTime();
        mock.push(newForm);
        return mock;
    }

    function findAllForms(){
        return mock;
    }

    function findFormByID(formID){
        for(var f in mock){
            if(mock[f]._id == formID){
                return mock[f];
            }
        }
        return null;
    }

    function updateForm(updatedForm, formID){
        for(var f in mock){
            if(mock[f]._id == formID){
                mock[f] = updatedForm;
            }
        }
        return null;
    }

    function deleteForm(formID){
        for(var i = 0; i < mock.length; i++){
            if(formID == mock[i]._id){
                mock.splice(i, 1);
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
        var userForms = {};
        for(var f in mock){
            if(mock[f].userId === userId){
                userForms.push(mock[f]);
            }
        }
        return userForms;
    }
};