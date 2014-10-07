function MyFirstController ($scope) {
	// body...

	$scope.myVar = "Fubar";

	$scope.counter = 0;

	$scope.myArray=["One","Two","Three"];

	$scope.itemInput = "";



	$scope.myClickFunction = function(){

		$scope.counter = $scope.counter + 1;
		console.log($scope.counter);

	}

	$scope.addItem = function(){

		if($scope.itemInput.length){

			$scope.myArray.push($scope.itemInput);
			$scope.itemInput="";


		}else{

			alert("Please enter an Item");
		}

		
	}

	$scope.removeItemAt = function(idx){


			$scope.myArray.splice(idx,1);
			
		

		
	// }



}