/**
 * Created by E02444 on 10/8/14.
 */

angular.module("RestaurantApp",[])
        .controller("RestaurantController",function($scope,RestaurantService){

        $scope.RestaurantArray = RestaurantService.getMenu();
        $scope.nameInput="";
        $scope.PriceInput="";
        $scope.CategoryInput="";


        $scope.OnMenuSubmit = function(){


            if($scope.nameInput.length){

                var ObjectMenu = {};

                ObjectMenu.name = $scope.nameInput;
                ObjectMenu.price = $scope.PriceInput;
                ObjectMenu.category = $scope.CategoryInput;

                RestaurantService.addMenu(ObjectMenu);

            }else{
                alert("Stop Being Lazy And Type Something")
            }

            $scope.nameInput="";
            $scope.PriceInput="";
            $scope.CategoryInput="";

        };

        $scope.removeMenu = function(MenuIndex){
            RestaurantService.removeMenu(MenuIndex);
        };

        Object.observe($scope.RestaurantArray, function(changes) {

            var number = $scope.RestaurantArray.length;

            document.getElementById("demo").innerHTML = number;

        });

    });