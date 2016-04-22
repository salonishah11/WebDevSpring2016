(function(){
    angular
        .module("AdoptAPet")
        .controller("AdoptPetDetailsController", AdoptPetDetailsController);

    function AdoptPetDetailsController($routeParams, $location, UserService, PetService, AdoptionRequestService){
        var vm = this;
        
        var id = $routeParams.id;

        vm.adopt = adopt;

        PetService
            .findPetByID(id)
            .then(function(response){
                if(response){
                    // console.log(response);
                    vm.petDet = response.data;
                }
            });

        function adopt(pet){
            //console.log(pet);
            AdoptionRequestService
                .isPetAdopted(id)
                .then(function (response) {
                    if(response.data){
                        var request = response.data;
                        var adopted = false;
                        for(var u in request){
                            if(request[u].status == 'Accepted') {
                                adopted = true;
                                break;
                            }
                        }

                        if(adopted){
                            alert("Sorry, the Animal is no longer available for Adoption!");
                        }
                        else{
                            UserService
                                .getCurrentUser()
                                .then(function(response) {
                                    var currentUser = response.data;

                                    if (currentUser) {
                                        $location.path('/adoptionRequest/user/' + currentUser._id + '/pet/' + pet.petfinder.pet.id.$t);
                                    }
                                    else {
                                        alert("Please Login/Register!");
                                        $location.path('/login');
                                    }
                                });
                        }
                    }
                    else{
                        UserService
                            .getCurrentUser()
                            .then(function(response) {
                                var currentUser = response.data;

                                if (currentUser) {
                                    $location.path('/adoptionRequest/user/' + currentUser._id + '/pet/' + pet.petfinder.pet.id.$t);
                                }
                                else {
                                    alert("Please Login/Register!");
                                    $location.path('/login');
                                }
                            });
                    }
                });
        }
    }
})();