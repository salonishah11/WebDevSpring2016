(function() {
    angular
        .module("AdoptAPet")
        .controller("AdoptionRequestFormController", AdoptionRequestFormController);

    function AdoptionRequestFormController($routeParams, $location, UserService, PetService, AdoptionRequestService) {
        var vm = this;

        var userId = $routeParams.userId;
        var petId = $routeParams.petId;

        vm.submitRequest = submitRequest;

        function init(){
            UserService
                .findUserById(userId)
                .then(function(response){
                   if(response){
                       vm.user = response.data;
                   } 
                });

            PetService
                .findPetByID(petId)
                .then(function(response){
                    if(response){
                        vm.pet = response.data.petfinder.pet;
                    }
                });
        }
        init();


        function submitRequest(user, pet){
            console.log(pet);
            var request = {
                status: "Pending",
                userId : userId,
                userName: user.name,
                pet : {
                    age: pet.age.$t,
                    animal: pet.animal.$t,
                    contact: pet.contact.email.$t,
                    description: pet.description.$t,
                    id: pet.id.$t,
                    mix: pet.mix.$t,
                    name: pet.name.$t,
                    sex: pet.sex.$t,
                    shelterId: pet.shelterId.$t,
                    shelterPetId: pet.shelterPetId.$t,
                    size: pet.size.$t,
                    status: pet.status.$t
                }
            };
            // console.log(request);

            UserService
                .findUserByShelterId(request.pet.shelterId)
                .then(function(response){
                    if(response.data == null){
                        alert("Representative for this Shelter Organization is currently " +
                            "unavailable. They will contact you as soon as a Representative" +
                            "is available. We are sorry for the inconvenience caused.")
                    }

                    AdoptionRequestService
                        .createRequest(request)
                        .then(function(response){
                            if(response){
                                alert("Request Submitted Successfully");
                                $location.path('/viewUserAdoptionRequests');
                            }
                        });
                });
        }
    }
})();