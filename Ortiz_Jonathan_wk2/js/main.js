/* Created By J.E Ortiz */
angular.module('employeeApp',['ngRoute'])
    .config(function($routeProvider){
        $routeProvider

            //routes

            .when('/home',{
                templateUrl: 'employeelist.html',
                controller: 'HomeController'
   

            })

            .when('/form',{
                templateUrl: 'employeeForm.html',
                controller: 'FormController'
    

            })

            .when('/details/:employeeIdx',{
                templateUrl: 'employeeDetails.html',
                controller: 'DetailController'
       

            })

            .when('/edit/:employeeIdx',{
                templateUrl: 'employeeForm.html',
                controller: 'EditController'
 

            })

            .otherwise({
                redirectTo: '/home'
            })
    })

    /* Controllers */

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


   /*  Service */

    .service('EmployeeService', function(){

        var employeeArray = [];

        this.getEmployee = function(){

            /*Load from Local Storage*/
            var lsData=localStorage.getItem('MyLocalData');

            
            try{
                employeeArray=JSON.parse(lsData);
            }catch(e){

            }
            return employeeArray;
             console.log("Hello8");
        };

        this.getEmployeeAt = function(employeeIndex){
            
            this.getEmployee();

            return employeeArray[employeeIndex];
             console.log("Hello9");
        };

        this.addEmployee = function(employeeObject){
            
            employeeArray.push(employeeObject);

            
            var stringyData=JSON.stringify(employeeArray);
            localStorage.setItem('MyLocalData',stringyData);
             console.log("Hello10");
        };

        this.updateEmployeeAt = function(employeeIndex, employeeObject){
            employeeArray.splice(employeeIndex,1,employeeObject);

           
            var stringyData=JSON.stringify(employeeArray);
            localStorage.setItem('MyLocalData',stringyData);
             console.log("Hello11");
        };

        this.removeEmployee = function(employeeIndex){
            employeeArray.splice(employeeIndex,1);

           
            var stringyData=JSON.stringify(employeeArray);
            localStorage.setItem('MyLocalData',stringyData);
             console.log("Hello12");
        }


    });

