(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {
        }

        init();

        function registerUser(user) {
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if (_user === null) {
                        return userService.createUser(user);
                    } else {
                        return model.error = "User already exists";
                        //to-do: find a way to not go into next .then if its return error
                    }
                })
                .then(function (response) {
                    _user = response.data;
                    $location.url("/user/" + _user._id);

                })

        }
    }
})();