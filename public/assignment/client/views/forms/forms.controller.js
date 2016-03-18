(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, UserService) {
        var vm = this;
        // Function Declarations
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        // variable to store the index value of selected row
        vm.selectedIndex = -1;

        function init(){
            // gets all the forms of current user
            FormService
                .findAllFormsForUser(UserService.getCurrentUser()._id)
                .then(function(response){
                    if(response.data){
                        //console.log(response.data);
                        vm.data = response.data;
                    }
                });
        }
        init();


        // Function Implementations

        // callback function of FormService.findAllFormsForUser
        // function to render the forms of current user
        function renderUserForms(response){
            vm.data = response;
        }


        // adds a new form to the database of current user
        function addForm(form){
            if(form.formName != null){
                var newForm = {"title": form.formName};
                FormService
                    .createFormForUser(UserService.getCurrentUser()._id, newForm)
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
                    "userId": UserService.getCurrentUser()._id};

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

        // callback function of updateForm()
        // renders the updated form on the page
        function renderUpdatedForm(response){
            $scope.data[$scope.selectedIndex] = response;
            $scope.formName = null;
            $scope.selectedIndex = -1;
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
    }
})();