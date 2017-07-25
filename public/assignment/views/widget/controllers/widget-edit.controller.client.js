(function () {

    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {
        var model = this;
        model.widgetId = $routeParams["wgid"];
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        // model.trustThisContent = trustThisContent;
        // model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);

        }

        init();


        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId
                + "/page/" + model.pageId + "/widget");

        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId
                + "/page/" + model.pageId + "/widget");

        }


    }

})();