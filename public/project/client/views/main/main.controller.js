(function(){
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();