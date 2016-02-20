(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    $rootScope = null;
    function HeaderController($scope) {
        $scope.displayLink = displayLink;
        $scope.checkUserAdmin = checkUserAdmin;
        $scope.logout = logout;

        function displayLink(){
            if($rootScope != null){
                $scope.username = $rootScope.username;
                return false;
            }
            else{
                return true;
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

        function logout(){
            $rootScope = null;
        }
    }
})();