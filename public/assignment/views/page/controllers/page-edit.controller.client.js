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
            pageService.findPageById(model.pageId)
                .then(function (response) {
                    model.page = response.data;
                });
            pageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }

        init();

        function updatePage(page) {
            pageService.updatePage(model.pageId, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }

        function deletePage() {
            pageService.deletePage(model.pageId)
                .then(function(response) {
                    var result=response.data;
                    if(result){
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                    }
                    // else{
                    //     model.errorMessage = "User not found";
                    // }
                });

        }


    }

})();