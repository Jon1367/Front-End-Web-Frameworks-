angular.module("MyAwesomeApp",[])

	.service("StudentDataService".function(){

		var = studentArray = [];

		this.getStudents = function(){

			return studentArray;

		}

		this.addStudent = function(stuObject){

			studentArray.push(stuObject);
		}

		this.removeStudent = function(stuIndex){

			studentArray.splice(stuIndex,1);

		}

		
	});