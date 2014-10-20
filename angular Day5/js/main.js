// THis app will be our First foray into AJAz within AnglarJS
angular.module("AJaxyGoodness",["ngRoute"])

	.config(function($routeProvider) {

		$routeProvider.when("/main",{

			controller:"FirstController"
			templateUrl:"mainView.html"

		}).otherwise({
			redirecttTo:"/main"

	})
	// Creating Controllers
	.controller('FirstController',function($scope,FlickerService){

		FlickerService.searchPhotos("batman");
		
		console.log("");

	})
	.service("FlickerService",function($http){

		var dataArray = [];

		this.getPhotoArray = function(){

			return dataArray;
		}

		this.searchPhotos = function(keyword){

			console.log("you Searched for :" + keyword);

			$http.jsonp("https://api.flickr.com/services
				/rest/?method=flickr.photos.search&api_
				key=d4dd7da8487df77e421cfebeb87c735e&tags=
				"+ keyword +"&extras=url_s,url_l&per_page=10&page=1&format=json$jsoncallback=JSON_CALLBACK")
				.sucess(function (data,status,headers,config){


					for(var i = 0;i < data.photos.photo;i++){

						console.log(data.photos.photo[i],title);
						dataArray.push(data.phots.photo[i]);

					}

					console.log("winning",data);


				})
				.error(function(data,status){

					console.log("Doesn't work");
					console.log(data);
					console.log(status);
				})



		}


	});
