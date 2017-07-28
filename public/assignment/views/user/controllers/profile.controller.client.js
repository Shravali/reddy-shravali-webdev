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
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
        }

        function unregister() {
            userService.deleteUser(model.userId)
                .then(function(response) {
                if(response.status(404)){
                    model.errorMessage = "User not found";
                }
                else{
                    $location.url("/login");
                }
            });


        }
    }

})();