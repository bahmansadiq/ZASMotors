(function() {
    'use strict';

    angular
        .module('app')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['AuthFactory', 'localStorageService', 'storageFactory', 'toastr', '$state','$stateParams'];

    /* @ngInject */
    function AuthController(AuthFactory, localStorageService, storageFactory, toastr, $state, $stateParams) {
        var auth = this;
        auth.title = 'AuthController';
     //    auth.email=  $stateParams.movieDetailId;
        // auth.password='';
//funtions to be accessed in html
        auth.login = login;
        auth.register=register;

        activate();

        ////////////////

        function activate() {


   						
        }
////////////////////////////////////////////        
// Dearler account registeration starts here//////
////////////////////////////////////////////
   function register() {
         var newDealer = {
                    email: auth.email,
                    password: auth.password,
                    firstName: auth.firstName,
                    lastName: auth.lastName,
                    role: auth.role
                }
            AuthFactory.dealerRegister(newDealer).then 
            (function(response) {

                   // console.log(response + "new dealer record successfully passed from controller")
                 
                   // return response;
                    console.log("see what is coming" +response);
                     var message=response.data.message;
                     setStorage('token', response.data.token);
                     var isRegistered= response.data.success;
                     if(isRegistered){
                        setTimeout(function(){
                              toastr.success(response.data.success);
                            }, 10);
                        vm.newUser=!vm.newUser;
                        auth.email='';
                        auth.password='';
                        auth.firstName='';
                        auth.lastName='';
                        auth.role='';
                        location.reload();
                     }
                     else
                    toastr.error(message);
                       // location.reload();
                })

        }
////////////////////////////////////////////
////Dealer registeration ends here//////////
////////////////////////////////////////////

        function login() {
         var dealerInfo = {
                    email: auth.email,
                    password: auth.password
                }
        	AuthFactory.dealerAuth(dealerInfo).then 
            (function(response) {

        			console.log(response.data+ " username and password successfully passed from controller");
        			setStorage('token', response.data);
        			setStorage('email', response.data.email);
/*        			setStorage('userId', response.userId);
        			setStorage('roles',response.roles);
*/
        		//	$state.go('home.dealer');
                var isLoggedIn=response.data.success;
                if(isLoggedIn){
                toastr.success("Successfully loged in");
                $state.go('home.dealer');
                  }
                else

                toastr.error(response.data.message);

        			return response;

        		},

        		function (error) {

        			toastr.error('Sorry, please enter correct login information.' + response.data.message);
        			console.log(error+"Unable to pass the login credintials in the login Controller");
        		})

        }

        function setStorage(key, value){
        	storageFactory.setLocalStorage(key, value);
        	 //localStorage.setItem(key,value);
            // localStorageService.set(key, value);
        		console.log("successfully setstorage in the aut controller!");

        		return;
        }
       
              function getStorage(key){
        	storageFactory.getLocalStorage(key)
        		console.log("successfully getstorage in the aut controller!");
        		return;
        	

        }
       
        

    }
})();