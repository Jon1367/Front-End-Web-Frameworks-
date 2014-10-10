angular.module("Day3App",[])
	.controller("PrimaryController",function($scope,MyService){

		$scope.test="Hello World";
		$scope.teamNameInput = "";
		$scope.teamCitynput = "";
		$scope.teamIsActiveInput = false;

		$scope.teamArray = MyService.getItems();

		$scope.addItem = function)(){

			// Form validation would go here if I were't lazy ...

			var newTeam = ();
			newTeam.name = $scope.teamNameInput;
			newTeam.city = $scope.teamCityInput;
			newTeam.isActive = $scope.teamIsActiveInput;

			// pass the new object to the service for safe-keeping

			MyService.addItem(newTeam);

			// Clean the form up for further use...
			$scope.teamNameInput = "";
			$scope.teamCitynput = "";
			$scope.teamIsActiveInput = true;
		}


	})
	.service("MyService",function(){

			var items = [];

			this.getItems = function(){


				var IsData = localStorage.getItem("MyLocalData")

				items = JSON.parse(IsData) || items;

				return items;
			}
			this.addItem = function(itemObject){

				items.push(itemObject);

				var stringyDdata = JSON.stringify(items);

				localStorage.setItem("MyLocalData",stringyData);


				console.log(items);
			}
			this.removeItemAt = function(itemIndex){

				items.splice(itemIndex,1);
			}
	})