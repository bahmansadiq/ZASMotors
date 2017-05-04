(function() {
    'use strict';

    angular
        .module('app')
        .controller('zasMotorsController', zasMotorsController);

    zasMotorsController.$inject = ['zasMotorsFactory', 'toastr','$state','$scope'];

    /* @ngInject */
    function zasMotorsController(zasMotorsFactory, toastr, $state, $scope) {
        var vm = this;
        vm.title = 'zasMotorsController';
        vm.findInventory=findInventory;
        vm.addInventory=addInventory;
        vm.findDealer=findDealer;
        vm.allInventories=[];
        vm.allDealers=[];

        activate();

        ////////////////

        function activate() {
        	findInventory();
            findDealer();

        }
/*modal starts*/


/*modal ends*/
$scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
        file.upload = Upload.upload({
            url: 'http://localhost:57450/api/image/',
            data: {file: file}
        });

        //put promise and event watchers here if wanted
    }   
};

// have to mension CRUD methods for the Inventory//

/////////************************///////////////
/////// find all the Inventories 
/////////************************///////////////
       function findInventory(){
            zasMotorsFactory.getInventory()
                .then(function(response) {

                        vm.allInventories = response;
                        return vm.allInventories;
                    },
                    function(error) {
                        toastr.error(error + "Unable to load the all the inventories from the factory to the controller!");
                    });
        }
/////////************************///////////////
/////// post a new Inventory 
/////////************************///////////////

        function addInventory(){

            var inventoryInfo = {
                    make: vm.make,
					model:vm.model,
					year:vm.year,
					price:vm.price,
					mileage:vm.mileage,
					exterior:vm.exterior,
					interior:vm.interior,
					vin:vm.vin,
					stockNumber:vm.stockNumber,
					engine:vm.engine,
					transmission:vm.transmission,
					fuelType:vm.fuelType,
					mpg:vm.mpg,
                    vehicleNotes: vm.vehicleNotes,
					vehicleOptions: vm.vehicleOptions
					
            };

                zasMotorsFactory.postInventory(inventoryInfo)
                    .then(function(response) {

                            toastr.success("Successfully added to the  list!");
                             $state.reload();
                            return response;
                        },
                        function(error) {
                            toastr.error(error + "Unable to passed the new customer infromation from Cotnroller to ZasMotorFactory!");
                            return error;
                        });
                   
            }

            // have to mension CRUD methods for the dealers//

/////////************************///////////////
/////// find all the Inventories 
/////////************************///////////////
       function findDealer(){
            zasMotorsFactory.getDealer()
                .then(function(response) {

                        vm.allDealers = response;
                        return vm.allDealers;
                    },
                    function(error) {
                        toastr.error(error + "Unable to load the all the dealers from the factory to the controller!");
                    });
        }

}
    
})();