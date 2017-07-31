(function () {

    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.createPage = createPage;

        function init() {
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            // model.page = pageService.findPageById(model.pageId);

        }

        init();

        function createPage(page) {
            pageService
                .createPage(model.websiteId, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });

        }

    }


})();