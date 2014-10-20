/**
 * Created by wsdrees on 10/15/14.
 */
angular.module('RecipeApp',['ngRoute'])
    .config(function($routeProvider){
        $routeProvider

   

            .when('/home',{
                templateUrl: 'list.html',
                controller: 'HomeController'
        console.log("hello1");

            })

            .when('/form',{
                templateUrl: 'form.html',
                controller: 'FormController'
  

            })

            .when('/details/:recipeIdx',{
                templateUrl: 'details.html',
                controller: 'DetailController'
   

            })

            .when('/edit/:recipeIdx',{
                templateUrl: 'form.html',
                controller: 'EditController'
     

            })

            .otherwise({
                redirectTo: '/home'
            })
    })

    //======================== Controllers =========================

    .controller('HomeController', function($scope,RecipeService){
        console.log("hello5");

        $scope.recipeArray=RecipeService.getRecipe();
    })

    .controller('FormController',function($scope,RecipeService){
        console.log("hello6");

        $scope.recipeInput={};

        $scope.onSubmit = function(){
        console.log("hello7");

            RecipeService.addRecipe($scope.recipeInput);
            //Clear the fields after submitting recipe
            $scope.recipeInput= {};
        }
    })

    .controller("DetailController",function($scope,$routeParams,RecipeService){
        console.log("hello8");


        $scope.recipeIndex = $routeParams.recipeIdx;
        $scope.theRecipe  = RecipeService.getRecipeAt($routeParams.recipeIdx);

        $scope.removeRecipe = function(recipeIndex){
            RecipeService.removeRecipe(recipeIndex);
        };

    })

    .controller('EditController',function($scope,RecipeService,$routeParams){
        $scope.recipeInput=RecipeService.getRecipeAt($routeParams.recipeIdx);

        console.log("hello9");


        $scope.onSubmit=function(){
            RecipeService.updateRecipeAt($routeParams.recipeIdx,$scope.recipeInput);

            //Return to details page
            document.location.hash='#/details'+$routeParams.recipeIdx;
        };

        //Remove the recipe
        $scope.removeRecipe = function(recipeIndex){
            RecipeService.removeRecipe(recipeIndex);

            //Return to list page
            document.location.hash='#/list'+$routeParams.recipeIdx;
        }
    })


    //======================== Services =========================

    .service('RecipeService', function(){

        var recipeArray = [];

        this.getRecipe = function(){
            //Load data from Local Storage
            var lsData=localStorage.getItem('MyLocalData');

            //If successful, use that data. Otherwise use recipeArray
            try{
                recipeArray=JSON.parse(lsData);
            }catch(e){

            }
            return recipeArray;
        };

        this.getRecipeAt = function(recipeIndex){
            //Make sure the latest data is from Local Storage
            this.getRecipe();

            return recipeArray[recipeIndex];
        };

        this.addRecipe = function(recipeObject){
            //Add recipe to array
            recipeArray.push(recipeObject);

            //Commit changes to Local Storage
            var stringyData=JSON.stringify(recipeArray);
            localStorage.setItem('MyLocalData',stringyData);
        };

        this.updateRecipeAt = function(recipeIndex, recipeObject){
            recipeArray.splice(recipeIndex,1,recipeObject);

            //Commit changes to Local Storage
            var stringyData=JSON.stringify(recipeArray);
            localStorage.setItem('MyLocalData',stringyData);
        };

        this.removeRecipe = function(recipeIndex){
            recipeArray.splice(recipeIndex,1);

            //Commit changes to Local Storage
            var stringyData=JSON.stringify(recipeArray);
            localStorage.setItem('MyLocalData',stringyData);
        }


    });

