(function(){
    angular
        .module("AdoptAPet")
        .controller("HomeController", HomeController);

    function HomeController($scope) {

        $scope.myInterval = 3000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [
            {
                image: 'img/slide_3.jpg',
                text: 'text 1',
                id: 0
            },
            {
                image: 'img/slide_4.jpg',
                text: 'text 1',
                id: 1
            },
            {
                image: 'img/slide_2.jpg',
                text: 'text 2',
                id: 2
            },
            {
                image: 'img/slide_1.jpg',
                text: 'text 3',
                id: 3
            },
            {
                image: 'img/slide_5.jpg',
                text: 'text 4',
                id: 4
            },
            {
                image: 'img/slide_6.jpg',
                text: 'text 5',
                id: 5
            }
        ];
        var currIndex = 0;

        // $('.carousel11').carousel({
        //     interval: 3000 //changes the speed
        // });
    }
})();