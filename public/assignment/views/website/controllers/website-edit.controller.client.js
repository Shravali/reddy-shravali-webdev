(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

        function websiteEditController($routeParams, websiteService, $location) {
            var model = this;
            model.userId = $routeParams["userId"];
            //var websiteId = $routeParams["wid"];
            model.websiteId = $routeParams["wid"];

            model.updateWebsite = updateWebsite;
            model.deleteWebsite = deleteWebsite;

            function init() {
                model.websites = websiteService.findWebsitesByUser(model.userId);
                model.website = websiteService.findWebsiteById(model.websiteId);
            }
            init();


            function updateWebsite(website) {
                websiteService.updateWebsite(model.websiteId, website);
                $location.url('/user/'+model.userId+'/website');


            }

            function deleteWebsite() {
                websiteService.deleteWebsite(model.websiteId);
                $location.url('/user/'+model.userId+'/website');

            }




        }

})();
