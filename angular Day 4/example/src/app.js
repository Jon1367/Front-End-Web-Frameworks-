/**
 * Created by chrismac on 10/10/14.
 */
angular.module("MyFirstRoutes", ["ngRoute"])
    .config(function($routeProvider){

        $routeProvider
            .when('/list', {

                templateUrl: 'part1.html',
                controller: 'ListController'
            })
            .when('/view2', {

                templateUrl: 'part2.html',
                controller: 'FormController'
            })
             .when('/view2', {

                templateUrl: 'part3.html',
                controller: 'DetailController'
            })
               .when('/edit/:filmIdx', {

                templateUrl: 'part2.html',
                controller: 'EditController'

            })
            .otherwise({
                redirectTo: '/view1'
            })
    })
    .controller("DetailController", function($scope, $routeParams, MyService){

            $scope.theFilm = MyService.getItemAt($routeParams.filmIdx);

            $scope.onSubmit = function(){


            }

    })
    .controller("ListController", function($scope, MyService){
        $scope.itemArray = MyService.getItems();

    })
    .controller("FormController", function($scope, MyService){
        $scope.filmInput = {};

        $scope.onSubmit = function(){

            MyService.addItem($scope.filmInput);
            $scope.filmInput = {};

            document.location.hash = "#/list";

        }

    })

.service("MyService",function(){

    var items=[];

    this.getItems = function(){

            var lsData = localStorage.getItem('MyLocalData');

            items = JSON.parse(lsData) || items;


    //            if(lsData){
    //                items = JSON.parse(lsData);   // long version
    //            }


            return items;

        };


    this.getItemAt = function(itemIndex){

            //Make sure we have the lastes data from local storage
            this.getItems();

            // Return a single item based on the index provided
            return items[itemIndex];

    }
    this.addItem = function(itemObject){
        items.push(itemObject);
//            console.log(items);

        var stringyData = JSON.stringify(items);
        localStorage.setItem('MyLocalData',stringyData)


    };
    this.updateItemAt = function(itemIndexx,itemObject){

        
    }

    this.removeItemAt = function(itemIndex){
        items.splice(itemIndex,1);

        var stringyData = JSON.stringify(items);
        localStorage.setItem('MyLocalData',stringyData)
    }

});
