(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;
        //model.userId = $routeParams["userId"];
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.createWebsiteForUser = createWebsite;

        function init() {
            // websiteService.findWebsiteById(websiteId)
            //     .then(function (response) {
            //         model.website = response.data;
            //     });
            websiteService.findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite(website) {
            websiteService
                .createWebsiteForUser(model.userId, website)
                .then(function (){
                    $location.url("/user/"+ model.userId + "/website" );

            });

        }

    }

})();