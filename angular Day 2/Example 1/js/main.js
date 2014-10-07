
//Name of App and other module
angular.module("MyAwesomeApp",[])
	
	.controller("MyController",function ($scope,StudentDataService) {
		// body...
		$scope.test = "Hi Mom";
		$scope.studentArray = DataService.getStudents();
		$scope.nameInput = "";
		$scope.gradeInput = "";

		$scope.onFormSubmit = function(){

			var studentObj = {};
			studentObj.name = $scope.nameInput;
			studentObj.grade = $scope.gradeInput;

			//store the object
			StudentDataService.addStudent(studentObj);

			//Rest theform!
			$scope.nameInput = "";
			$scope.gradeInput = "";

			//small, testablesteps, $*^-IT

			console.log($scope.studentArray);

		}

		$scope.removeStudent = function(studentIdx){

			StudentDataService.splice(studentIdx);

		}

	})