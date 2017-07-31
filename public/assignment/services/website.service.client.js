(function () {
    angular
        .module("WebAppMaker")
        .service("websiteService", websiteService);

    function websiteService($http) {

        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId) {
            //var url = "/api/user/" + userId + "/website/" + websiteId;
            var url = "/api/website/" + websiteId;
            return $http.get(url);

        }

        function createWebsite(userId, website) {
           var url = "/api/user/" + userId + "/website";
           return $http.post(url, website);

        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);

        }

    }
})();