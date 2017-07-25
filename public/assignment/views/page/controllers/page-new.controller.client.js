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
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);

        }
        init();

        function createPage() {
            pageService.createPage(model.websiteId, model.page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

    }

})();