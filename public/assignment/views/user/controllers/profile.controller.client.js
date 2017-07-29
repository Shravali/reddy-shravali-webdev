(function () {

    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location) {
        var model = this;
        var userId = $routeParams["userId"];
        model.userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                    console.log(response.data);
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
            console.log(user);
        }

        function unregister() {
            userService.deleteUser(model.userId)
                .then(function(response) {
                    var result=response.data;
                if(result){
                    $location.url("/login");
                }
                else{
                    model.errorMessage = "User not found";
                }
            });


        }
    }

})();