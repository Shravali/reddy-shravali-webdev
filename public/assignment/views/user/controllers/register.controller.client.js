(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {
            console.log("register controller");
        }

        init();

        function registerUser(user) {
            console.log("here");
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if (_user === "0") {
                        console.log("here!!!!!");
                        return userService.createUser(user);
                    } else {
                        model.error = "User already exists";
                    }
                })
                .then(function (response) {
                    _user = response.data;
                    $location.url("/user/" + user._id);

                })

        }
    }
})();