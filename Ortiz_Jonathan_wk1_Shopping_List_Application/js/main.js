function ShoppingListController ($scope){

	$scope.ShoppingListArray = ["Rice","Milk"];
	$scope.addToList = "";
	$scope.inputItem = "";



	$scope.addToList = function (){

		if($scope.inputItem.length){

			$scope.ShoppingListArray.push($scope.inputItem);
			$scope.inputItem = "";

		}else{

			alert("Please Enter an Item");
		}
	}
	$scope.removeStudent = function(index){


		$scope.ShoppingListArray.splice(index,1);
		

	}

	// $scope.ListCross = getComputedStyles('p');

	// it('should check ng-style', function() {

	// 	expect(ListCross.getCssValue('text-decoration')).toBe('none');
	// 	element(by.css('input[value=\'checkOff\']')).click();
	// })

}