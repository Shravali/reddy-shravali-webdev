(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;
        //model.userId = $routeParams["userId"];
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function createWebsite() {
            websiteService.createWebsite(model.userId, model.website);
            $location.url("/user/"+ model.userId + "/website/" )

        }

    }

})();