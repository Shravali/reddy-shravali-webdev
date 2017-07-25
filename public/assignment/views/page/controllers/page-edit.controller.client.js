(function () {

    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.page = pageService.findPageById(model.pageId);
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);

        }

        init();

        function updatePage(page) {
            pageService.updatePage(model.pageId, page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");

        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");

        }


    }

})();