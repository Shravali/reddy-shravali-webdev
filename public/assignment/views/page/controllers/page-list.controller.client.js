(function () {

    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService) {
        var model = this;
        //model.userId = $routeParams.websiteId;
        model.userId = $routeParams.userId;
        //var websiteId = $routeParams["websiteId"];
        model.websiteId = $routeParams["wid"];


        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();


    }

})();