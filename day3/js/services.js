/**
 * Created by E02444 on 10/8/14.
 */

angular.module("RestaurantApp")
    .service("RestaurantService",function(){


        var RestaurantArray = [];

        this.getMenu = function(){
            return RestaurantArray;
        };
        this.addMenu = function(MenuObject){
            RestaurantArray.push(MenuObject);
        };
        this.removeMenu = function(MenuIndex){
            RestaurantArray.splice(MenuIndex,1)
        }


    });