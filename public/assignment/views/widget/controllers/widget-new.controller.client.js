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
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            model.widget = {};

        }
        init();


        function editHeader() {
            model.widget.widgetType = "HEADING";
            widgetService
                .createWidget(model.pageId, model.widget)
                .then(function (response) {
                    model.widget = response.data;
                });

        }

        function editImage() {
            model.widget.widgetType = "IMAGE";
            widgetService
                .createWidget(model.pageId, model.widget)
                .then(function (response) {
                    model.widget = response.data;
                });
        }

        function editYoutube() {
            model.widget.widgetType = "YOUTUBE";
            widgetService
                .createWidget(model.pageId, model.widget)
                .then(function (response) {
                    model.widget = response.data;
                });
        }





    }

})();