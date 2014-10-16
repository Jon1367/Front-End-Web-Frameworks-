/**
 * Created by E02444 on 10/8/14.
 */

angular.module("Day3App", [])
    .controller("PrimaryController",function($scope,MyService){

        //$scope.test= "Huzzah"

        $scope.teamNameInput ='';
        $scope.cityInput='';
        $scope.teamIsActiveInput=false;

        $scope.teamArray = MyService.getItems();

        $scope.addItem = function(){

            //form calidation goes here
            var newTeam = {};
            newTeam.name = $scope.teamNameInput;
            newTeam.city = $scope.cityInput;
            newTeam.isActive = $scope.teamIsActiveInput;

            //Pass tjhe new object to the service for safe keeping
            MyService.addItem(newTeam);

            //clean the form up for further use
            $scope.teamNameInput ='';
            $scope.cityInput='';
            $scope.teamIsActiveInput=false;




        };

        $scope.removeItem = function(idx){
            MyService.removeItemAt(idx)
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

        this.addItem = function(itemObject){
            items.push(itemObject);
//            console.log(items);

            var stringyData = JSON.stringify(items);
            localStorage.setItem('MyLocalData',stringyData)


        };


        this.removeItemAt = function(itemIndex){
            items.splice(itemIndex,1);

            var stringyData = JSON.stringify(items);
            localStorage.setItem('MyLocalData',stringyData)
        }

    });