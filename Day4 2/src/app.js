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
            .when('/new', {
                templateUrl: 'part2.html',
                controller: 'FormController'
            })
            .when('/detail/:filmIdx',{
                templateUrl: 'part3.html',
                controller: 'DetailController'
            })
            .when('/edit/:filmIdx',{
                templateUrl: 'part2.html',
                controller: 'EditController'
            })
            .otherwise({
                redirectTo: '/list'
            })
    })
    .controller("DetailController", function($scope, $routeParams, MyService){
        $scope.filmIndex = $routeParams.filmIdx;
        $scope.theFilm = MyService.getItemAt($routeParams.filmIdx)
    })
    .controller("ListController", function($scope, MyService){
        $scope.filmArray = MyService.getItems();

    })
    .controller("EditController", function($scope, $routeParams, MyService){
        $scope.filmInput = MyService.getItemAt($routeParams.filmIdx);

        $scope.onSubmit = function(){
            MyService.updateItemAt($routeParams.filmIdx, $scope.filmInput)
            document.location.hash = "#/detail/"+$routeParams.filmIdx;

        }
    })
    .controller("FormController", function($scope, MyService){
        $scope.filmInput = {};

        $scope.onSubmit = function(){
            MyService.addItem($scope.filmInput);
            $scope.filmInput = {};

            document.location.hash = "#/list/"

        }

    })

.service("MyService",function(){

    var items=[];

    this.getItems = function(){

        var lsData = localStorage.getItem('MyLocalData');

        items = JSON.parse(lsData) || items;

        return items;
    };

    this.getItemAt = function(itemIndex){
        this.getItems();
      return items[itemIndex];
    };
    this.addItem = function(itemObject){
        items.push(itemObject);
//            console.log(items);

        var stringyData = JSON.stringify(items);
        localStorage.setItem('MyLocalData',stringyData)


    };

    this.updateItemAt = function(itemIndex, itemObject){

        items.splice(itemIndex,1,itemObject);

        var stringyData = JSON.stringify(items);
        localStorage.setItem('MyLocalData',stringyData)
    };


    this.removeItemAt = function(itemIndex){
        items.splice(itemIndex,1);

        var stringyData = JSON.stringify(items);
        localStorage.setItem('MyLocalData',stringyData)
    }

});
