/**
 * Created by wsdrees on 10/15/14.
 */
angular.module('employeeApp',['ngRoute'])
    .config(function($routeProvider){
        $routeProvider




            .when('/home',{
                templateUrl: 'employeelist.html',
                controller: 'HomeController'
   

            })

            .when('/form',{
                templateUrl: 'employeeForm.html',
                controller: 'FormController'
    

            })

            .when('/details/:recipeIdx',{
                templateUrl: 'employeeDetails.html',
                controller: 'DetailController'
       

            })

            .when('/edit/:recipeIdx',{
                templateUrl: 'employeeForm.html',
                controller: 'EditController'
 

            })

            .otherwise({
                redirectTo: '/home'
            })
    })

    //======================== Controllers =========================

    .controller('HomeController', function($scope,EmployeeService){
        
                console.log("Hello");

        $scope.employeeArray=EmployeeService.getEmployee();

    })

    .controller('FormController',function($scope,EmployeeService){

        $scope.employeeInput={};

         console.log("Hello2");

        $scope.onSubmit = function(){
      

            EmployeeService.addEmployee($scope.employeeInput);
            //Clear the fields after submitting recipe
            $scope.employeeInput= {};

             console.log("Hello3");
        }
    })

    .controller("DetailController",function($scope,$routeParams,EmployeeService){
        console.log("hello4");


        $scope.employeeIndex = $routeParams.employeeIdx;
        $scope.theEmployee  = EmployeeService.getEmployeeAt($routeParams.employeeIdx);

        $scope.removeEmployee = function(employeeIndex){
            EmployeeService.removeEmployee(employeeIndex);
        };

    })

    .controller('EditController',function($scope,EmployeeService,$routeParams){
        $scope.employeeInput=EmployeeService.getEmployeeAt($routeParams.employeeIdx);

        console.log("hello5");


        $scope.onSubmit=function(){
             console.log("Hello6");

            EmployeeService.updateEmployeeAt($routeParams.employeeIdx,$scope.employeeInput);

            //Return to details page
            document.location.hash='#/details'+$routeParams.employeeIdx;
        };

        //Remove the recipe
        $scope.removeEmployee = function(employeeIndex){
             console.log("Hello7");

            EmployeeService.removeEmployee(employeeIndex);

            //Return to list page
            document.location.hash='#/list'+$routeParams.employeeIdx;
        }
    })


    //======================== Services =========================

    .service('EmployeeService', function(){

        var employeeArray = [];

        this.getEmployee = function(){
            //Load data from Local Storage
            var lsData=localStorage.getItem('MyLocalData');

            //If successful, use that data. Otherwise use recipeArray
            try{
                employeeArray=JSON.parse(lsData);
            }catch(e){

            }
            return employeeArray;
             console.log("Hello8");
        };

        this.getEmployeeAt = function(employeeIndex){
            //Make sure the latest data is from Local Storage
            this.getEmployee();

            return employeeArray[employeeIndex];
             console.log("Hello9");
        };

        this.addEmployee = function(employeeObject){
            //Add recipe to array
            employeeArray.push(employeeObject);

            //Commit changes to Local Storage
            var stringyData=JSON.stringify(employeeArray);
            localStorage.setItem('MyLocalData',stringyData);
             console.log("Hello10");
        };

        this.updateEmployeeAt = function(employeeIndex, employeeObject){
            employeeArray.splice(employeeIndex,1,employeeObject);

            //Commit changes to Local Storage
            var stringyData=JSON.stringify(employeeArray);
            localStorage.setItem('MyLocalData',stringyData);
             console.log("Hello11");
        };

        this.removeEmployee = function(employeeIndex){
            employeeArray.splice(employeeIndex,1);

            //Commit changes to Local Storage
            var stringyData=JSON.stringify(employeeArray);
            localStorage.setItem('MyLocalData',stringyData);
             console.log("Hello12");
        }


    });

