/*	Angular js File */

angular.module("candyApp",['ngRoute'])
		.config(function($routeProvider){

			$routeProvider

				// Create the Controllers and link to html pages

				.when('/list',{

					templateUrl:"CandyList.html",
					controller:"MainController"

				})

				.when('/form',{

					templateUrl:"CandyForm.html",
					controller:"FormController"

				})

				.when('/details/:candyIdx',{

					templateUrl:"CandyDetails.html",
					controller:"DetailController"

				})

				.when('/edit/:candyIdx',{

					templateUrl:"CandyForm.html",
					controller:"EditController"

				})
				.otherwise({

						redirecTo: '/home'

				})

		})  // End of config

		/*========  Controllers  ========*/

	.controller('MainController', function($scope,CandyService){

		  console.log("Hello1");
        

        $scope.candyArray=CandyService.getCandy();

    })

    .controller('FormController',function($scope,CandyService){

    	  console.log("Hello2");

        $scope.candyInput={};


        $scope.onSubmit = function(){
      

            CandyService.addCandy($scope.candyInput);

            $scope.candyInput= {};

        }
    })

    .controller("DetailController",function($scope,$routeParams,CandyService){

        console.log("hello3");


        $scope.candyIndex = $routeParams.candyIdx;
        $scope.theCandy  = CandyService.getCandyAt($routeParams.candyIdx);

        $scope.removeCandy = function(candyIndex){
            CandyService.removeCandy(candyIndex);
        };

    })

    .controller('EditController',function($scope,CandyService,$routeParams){

        console.log("hello4");


        $scope.candyInput=CandyService.getCandyAt($routeParams.candyIdx);



        $scope.onSubmit=function(){

        	console.log("hello5");


            CandyService.updateCandyAt($routeParams.candyIdx,$scope.candyInput);

            //Return to details page
            document.location.hash='#/details'+$routeParams.candyIdx;
        };

        //Remove the recipe
        $scope.removecandy = function(candyIndex){
             console.log("Hello6");

            CandyService.removeCandy(candyIndex);

            //Return to list page
            document.location.hash='#/list'+$routeParams.candyIdx;
        }
    })

		/*========  Service Section  ========*/

    .service('CandyService', function(){

             console.log("Hello7");


        var candyArray = [];

        this.getCandy = function(){

            /*Load from Local Storage*/
            var lsData=localStorage.getItem('MyLocalData');

            
            try{
                candyArray=JSON.parse(lsData);
            }catch(e){

            }
            return candyArray;
             console.log("Hello8");
        };

        this.getCandyAt = function(candyIndex){
            
            this.getCandy();

            return candyArray[candyIndex];
             console.log("Hello9");
        };

        this.addCandy = function(candyObject){
             console.log("Hello10");

            
            candyArray.push(candyObject);

            
            var stringyData=JSON.stringify(candyArray);
            localStorage.setItem('MyLocalData',stringyData);
  
        };

        this.updateCandyAt = function(candyIndex, candyObject){
             console.log("Hello11");


            candyArray.splice(candyIndex,1,candyObject);

           
            var stringyData=JSON.stringify(candyArray);
            localStorage.setItem('MyLocalData',stringyData);
             
        };

        this.removeCandy = function(candyIndex){

             console.log("Hello12");


            candyArray.splice(candyIndex,1);

           
            var stringyData=JSON.stringify(candyArray);
            localStorage.setItem('MyLocalData',stringyData);
           
        }


    });


