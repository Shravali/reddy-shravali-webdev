(function () {
    angular
        .module("WebAppMaker")
        .service("websiteService", websiteService);

    function websiteService() {

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function findWebsitesByUser(userId) {
            var sites = [];

            for (var w in websites) {
                if (websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }

            return sites;
        }

        function findWebsiteById(websiteId) {

            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    return websites[w];
                }
            }
            return null;

        }

        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function updateWebsite(websiteId, website) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites[w] = website;
                    return;
                }
            }

            return null;
        }

        function deleteWebsite(websiteId) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                    return;
                }
            }
        }

    }
})();