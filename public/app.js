const ng = angular.module('MyApp', ['ngRoute']);


//Initialize AngularJS Router
ng.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });

    $routeProvider.when('/url1', {
	templateUrl: 'partials/partial1.html',
	controller: function(){	},
	controllerAs: 'ctrl'
    });


}]);

//////////////////////
//MAIN CONTROLLER
///////////////////////

ng.controller('MainCtrl', [ '$http', function($http){

controller = this;

    this.getBookmarks = (username) => {

        $http({
            method:'GET',
            url: '/bookmarkapi/'+ username,
        }).then(function(response){
            console.log(response);
            controller.bookmarkArray = [response.data];
            console.log(controller.bookmarkArray);
        }, function(){
            console.log('error');
        });


    }


    this.createBookmark = (user) => {
        $http({
            method:'POST',
            url: '/bookmarkapi',
            data: {
              title: controller.bookmarkTitle,
              url: controller.bookmarkUrl,
              username: user
            }
        }).then(function(response){
            console.log(response);
            controller.getBookmarks(user);
        }, function(){
            console.log('error');
        });
    }


    this.deleteBookmark = function(bookmark){
    $http({
        method:'DELETE',
        url: '/bookmarkapi/' + bookmark._id
    }).then(
        function(response){
            controller.getBookmarks(bookmark.username);
        },
        function(error){

        }
    );
}

    this.editBookmark = function(bookmark){
        $http({
        method:'PUT',
        url: '/bookmarkapi/' + bookmark._id,
        data: {
            title: controller.updatedBookmarkTitle,
            url: controller.updatedBookmarkUrl,
        }
    }).then(
        function(response){
            controller.getBookmarks(bookmark.username);
        },
        function(error){

        }
    );
}

this.clearData = () => {

    controller.bookmarkArray = [];

}


}]);


//////////////////
//AUTHENTICATION CONTROLLER
//////////////////
ng.controller('AuthController', ['$http', function($http){


    const controller2 = this;
    this.displayApp = function(getData){
        $http({
            method:'GET',
            url: '/users/sessionUser'
        }).then(function(response){
            controller2.loggedInUsername = response.data.username; //change this
            getData(response.data.username);
        }, function(){
            console.log('error');
        });
    }

    this.createUser = function(){
        $http({
            method:'POST',
            url:'/users',
            data: {
                username: this.createusername,
                password: this.createpassword
            }
        }).then(function(response){
            console.log(response);
            controller2.createusername = 'thanks, now login';
            controller2.createpassword = null;
        }, function(error){
            console.log(error);
            controller2.createusername = 'fail';
            controller2.createpassword = null;
        })
    }

this.logIn = function(getData){
    $http({
        method:'POST',
        url:'/users/sessions',
        data: {
            username: this.username,
            password: this.password
        }
    }).then(function(response){
        console.log(response);
        controller2.username = null;
        controller2.password = null;
        controller2.displayApp(getData);
    }, function(error){
        console.log(error);
        controller2.username = 'fail';
        controller2.password = null;
    })
}

this.logOut = function(clearFunction){
    $http({
        method:'DELETE',
        url:'/users/sessions'
    }).then(function(response){
        console.log(response);
        controller2.loggedInUsername = null;
        clearFunction();
    }, function(error){
        console.log(error);
    });
}


}]);


// ng.controller('MainCtrl', function(){
//
// });
