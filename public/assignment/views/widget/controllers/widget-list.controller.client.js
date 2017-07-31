(function () {

    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;


        function init() {
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function trustThisContent(html) {
            return $sce.trustAsHtml(html);

        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkParts = youTubeLink.split('/');
            var id = linkParts[linkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }


    }

})();