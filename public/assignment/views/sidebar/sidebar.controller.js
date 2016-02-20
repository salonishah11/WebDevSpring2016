(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    $rootScope = null;
    function SidebarController($scope) {
        $scope.displayLink = displayLink;
        $scope.checkUserAdmin = checkUserAdmin;

        function displayLink(){
            if($rootScope != null){
                return true;
            }
            else{
                return false;
            }
        }

        function checkUserAdmin(){
            if($rootScope != null){
                for(var i = 0; i < $rootScope.roles.length; i++){
                    if($rootScope.roles[i] == "admin"){
                        return true;
                    }
                }
            }
        }
    }
})();