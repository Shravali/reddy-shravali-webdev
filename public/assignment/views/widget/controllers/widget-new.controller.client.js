(function () {

    angular
        .module("WebAppMaker")
        .controller("widgetChooserController", widgetChooserController);

    function widgetChooserController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.editHeader = editHeader;
        model.editImage = editImage;
        model.editYoutube = editYoutube;
        model.editHtml = editHtml;
        model.editText = editText;
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
                })
                .then(function () {
                    $location.url("user/" + model.userId + "/website/" +
                        model.websiteId + "/page/" + model.pageId + "/widget/" + model.widget._id);
                })

        }

        function editImage() {
            model.widget.widgetType = "IMAGE";
            widgetService
                .createWidget(model.pageId, model.widget)
                .then(function (response) {
                    model.widget = response.data;
                })
                .then(function () {
                    $location.url("user/" + model.userId + "/website/" +
                        model.websiteId + "/page/" + model.pageId + "/widget/" + model.widget._id);
                })

        }

        function editYoutube() {
            model.widget.widgetType = "YOUTUBE";
            widgetService
                .createWidget(model.pageId, model.widget)
                .then(function (response) {
                    model.widget = response.data;
                })
                .then(function () {
                    $location.url("user/" + model.userId + "/website/" +
                        model.websiteId + "/page/" + model.pageId + "/widget/" + model.widget._id);
                })

        }
        function editHtml() {
            model.widget.widgetType = "HTML";
            widgetService
                .createWidget(model.pageId, model.widget)
                .then(function (response) {
                    model.widget = response.data;
                })
                .then(function () {
                    $location.url("user/" + model.userId + "/website/" +
                        model.websiteId + "/page/" + model.pageId + "/widget/" + model.widget._id);
                })

        }

        function editText() {
            model.widget.widgetType = "TEXT";
            widgetService
                .createWidget(model.pageId, model.widget)
                .then(function (response) {
                    model.widget = response.data;
                })
                .then(function () {
                    $location.url("user/" + model.userId + "/website/" +
                        model.websiteId + "/page/" + model.pageId + "/widget/" + model.widget._id);
                })

        }


    }

})();