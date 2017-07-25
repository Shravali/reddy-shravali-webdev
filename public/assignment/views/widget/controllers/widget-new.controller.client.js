(function () {

    angular
        .module("WebAppMaker")
        .controller("widgetChooserController", widgetChooserController);

    function widgetChooserController($routeParams, widgetService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.editHeader = editHeader;
        model.editImage = editImage;
        model.editYoutube = editYoutube;
        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = {};

        }
        init();


        function editHeader() {
            model.widget.widgetType = "HEADING";
            model.widget = widgetService.createWidget(model.pageId, model.widget);
        }

        function editImage() {
            model.widget.widgetType = "IMAGE";
            model.widget = widgetService.createWidget(model.pageId, model.widget);
        }

        function editYoutube() {
            model.widget.widgetType = "YOUTUBE";
            model.widget = widgetService.createWidget(model.pageId, model.widget);
        }





    }

})();