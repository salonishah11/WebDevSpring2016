(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    
    function FieldController($routeParams, FieldService) {
        var vm = this;

        var formId = $routeParams.formId;

        vm.addField = addField;
        vm.cloneField = cloneField;
        vm.deleteField = deleteField;
        vm.selectField = selectField;
        vm.editField = editField;
        vm.sortField  = sortField;

        function init(){
            //var currentUser = UserService.getCurrentUser();
            FieldService
                .getFieldsForForm($routeParams.formId)
                .then(function(response){
                    if(response){
                        vm.fields = response.data;
                    }
                });
        }
        init();

        function addField(fieldType){
            var newField;
            switch(fieldType) {
                case "TEXT":
                    newField = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    newField = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    newField = {"label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS":
                    newField = {
                         "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;
                case "CHECKBOXES":
                    newField = {
                         "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "RADIOS":
                    newField = {
                        "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
            }

            FieldService
                .createFieldForForm($routeParams.formId, newField)
                .then(function(response){
                    if(response.data) {
                        init();
                    }
                });

        }


        function cloneField(newField) {
            //console.log(newField);
            delete newField._id;
            
            FieldService
                .createFieldForForm($routeParams.formId, newField)
                .then(function(response){
                    if(response.data) {
                        init();
                    }
                });

        }
        
        function deleteField(fieldId) {
            FieldService
                .deleteFieldFromForm($routeParams.formId, fieldId)
                .then(function(response){
                    if(response.data) {
                        init();
                    }
                });
        }

        function selectField(field) {
            vm.updatedField = field;
            vm.label = field.label;

            if(field.options){
                var optVal = "";
                for(var i in field.options){
                    optVal = optVal + field.options[i].label;
                    optVal += ":";
                    optVal = optVal + field.options[i].value;
                    optVal += "\n";
                }
                vm.options = optVal;
            }

            if(field.placeholder){
                vm.placeholder = field.placeholder;
            }
        }

        function editField(){
            if(vm.updatedField.options){
                var options = vm.options.split("\n");
                var opt = [];

                for (var i in options){
                    var pair = options[i].split(":");
                    var obj = {
                        "label" : pair[0] ,
                        "value" : pair[1]};
                    if(obj.label != "")
                    opt.push(obj);
                }
                vm.updatedField.options = opt;
            }

            if(vm.updatedField.placeholder){
                vm.updatedField.placeholder  = vm.placeholder;
            }

            vm.updatedField.label = vm.label;
            
            FieldService
                .updateField($routeParams.formId, vm.updatedField._id, vm.updatedField)
                .then(function(response){
                        init();
                    }
                );
        }

        function sortField(start, end) {
            FieldService
                .sortField($routeParams.formId, start, end)
                .then(
                    function (response) {
                        vm.fields = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }
})();