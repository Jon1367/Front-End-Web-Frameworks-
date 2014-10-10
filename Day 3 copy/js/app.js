angular.module("Day3App", [])
    .controller("MyController",function($scope,MyService){

		$scope.test="Test";

        $scope.teamNameInput ='';
        $scope.teamCityInput='';
        $scope.teamIsActiveInput=false;

        $scope.teamArray = MyService.getItems();

        $scope.addItem = function(){

       

            var newTeam = {};
            newTeam.name = $scope.teamNameInput;
            newTeam.city = $scope.teamCityInput;
            newTeam.isActive = $scope.teamIsActiveInput;

            

            MyService.addItem(newTeam);

    

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




            return items;
        };

        this.addItem = function(itemObject){
            items.push(itemObject);
          

            var stringyData = JSON.stringify(items);
            localStorage.setItem('MyLocalData',stringyData)


        };


        this.removeItemAt = function(itemIndex){
            items.splice(itemIndex,1);

            var stringyData = JSON.stringify(items);
            localStorage.setItem('MyLocalData',stringyData)
        }

    });
		


