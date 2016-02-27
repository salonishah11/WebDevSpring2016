(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, UserService) {
        // Function Declarations
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        // variable to store the index value of selected row
        $scope.selectedIndex = -1;


        // Function Implementations
        // gets all the forms of current user
        FormService.findAllFormsForUser(UserService.getCurrentUser()._id, renderUserForms);

        // callback function of FormService.findAllFormsForUser
        // function to render the forms of current user
        function renderUserForms(response){
            $scope.data = response;
        }


        // adds a new form to the database of current user
        function addForm(formName){
            if(formName != null){
                var newForm = {"title": formName};
                FormService.createFormForUser(UserService.getCurrentUser()._id, newForm, renderNewForm);
            }
        }

        // callback function of addForm()
        // pushes the data to $scope.data to render the new form
        function renderNewForm(response){
            //console.log(response);
            $scope.data.push(response);
            $scope.formName = null;
        }


        // updates the formName of selected form
        function updateForm(formName){
            if(($scope.selectedIndex != -1) && (formName != null)){
                var selectedForm = $scope.data[$scope.selectedIndex];
                var updatedForm = {
                    "_id": selectedForm._id,
                    "title": formName,
                    "userId": UserService.getCurrentUser()._id};

                FormService.updateFormById(selectedForm._id, updatedForm, renderUpdatedForm);
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
            var selectedForm = $scope.data[index];
            FormService.deleteFormById(selectedForm._id, renderRemainingForms);
        }

        // callback function of deleteForm()
        // renders the remaining forms of the user
        function renderRemainingForms(response){
            //$scope.data = response;
            FormService.findAllFormsForUser(UserService.getCurrentUser()._id, renderUserForms);
        }


        // selects a form
        function selectForm(index){
            $scope.selectedIndex = index;
            var selectedForm = $scope.data[index];
            $scope.formName = selectedForm.title;
        }
    }
})();