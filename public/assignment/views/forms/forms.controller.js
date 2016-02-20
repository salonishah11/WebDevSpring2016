(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $location, $scope) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        FormService.findAllFormsForUser($rootScope._id, renderUserForms);

        function renderUserForms(response){
            $scope.data = response;
        }


        function addForm(formName){
            var newForm = {"title": formName};
            FormService.createFormForUser($rootScope._id, newForm, renderNewForm);
        }

        function renderNewForm(response){
            //console.log(response);
            $scope.data.push(response);
            $scope.formName = "";
        }


        function updateForm(formName){
            var selectedForm = $scope.data[selectedIndex];
            var updatedForm = {
                "_id": selectedForm._id,
                "title": formName,
                "userId": $rootScope._id};

            FormService.updateFormById(selectedForm._id, updatedForm, renderUpdatedForm);
        }

        function renderUpdatedForm(response){
            $scope.data = response;
            $scope.formName = "";
        }


        function deleteForm($index){
            //console.log($scope.data[$index]);
            var selectedForm = $scope.data[$index];
            FormService.deleteFormById(selectedForm._id, renderRemainingForms);
        }

        function renderRemainingForms(response){
            $scope.data = response;
        }

        var selectedIndex = null;
        function selectForm($index){
            selectedIndex = $index;
            var selectedForm = $scope.data[$index];
            $scope.formName = selectedForm.title;
        }
    }
})();