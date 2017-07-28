(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {



        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }


        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);

        }

        function findUserByUsername(username) {
            console.log("the username in service", username);
            var url = "/api/user/";
            return $http.get(url);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            console.log(url);
            // /user?username=alice&password=alice
            return $http.get(url);
        }


    }
})();






