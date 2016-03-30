(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, UserService, $location) {
        var vm = this;
        // Function Declarations
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.displayFields = displayFields;

        // variable to store the index value of selected row
        vm.selectedIndex = -1;
        
        var currentUser;

        function init(){
            UserService
                .getCurrentUser()
                .then(function(response){
                    if(response.data){
                        currentUser = response.data;

                        // gets all the forms of current user
                        FormService
                            .findAllFormsForUser(currentUser._id)
                            .then(function(response){
                                if(response.data){
                                    //console.log(response.data);
                                    vm.data = response.data;
                                }
                            });
                    }
                });
        }
        init();


        // Function Implementations

        // adds a new form to the database of current user
        function addForm(form){
            if(form.formName != null){
                var newForm = {"title": form.formName};
                FormService
                    .createFormForUser(currentUser._id, newForm)
                    .then(function(response){
                        if(response.data){
                            //console.log(response.data);
                            vm.form.formName = null;
                            init();
                        }
                    });
            }
        }

        // updates the formName of selected form
        function updateForm(form){
            if((vm.selectedIndex != -1) && (form.formName != null)){
                var selectedForm = vm.data[vm.selectedIndex];
                var updatedForm = {
                    "_id": selectedForm._id,
                    "title": form.formName,
                    "userId": currentUser._id};

                FormService
                    .updateFormById(selectedForm._id, updatedForm)
                    .then(function(response){
                        if(response.data){
                            //console.log(response.data);
                            vm.data[vm.selectedIndex] = response.data;
                            vm.form.formName = null;
                            vm.selectedIndex = -1;
                        }
                    });
            }
        }


        // deletes a selected form
        function deleteForm(index){
            var selectedForm = vm.data[index];
            FormService
                .deleteFormById(selectedForm._id)
                .then(function(response){
                    if(response.data){
                        init();
                    }
                });
        }

        // selects a form
        function selectForm(index){
            vm.selectedIndex = index;
            var selectedForm = vm.data[index];
            vm.form = selectedForm;
            vm.form.formName = selectedForm.title;
        }


        function displayFields(index) {
            var selectedForm = vm.data[index];
            $location.path('/form/' + selectedForm._id + '/fields');
        }
    }
})();