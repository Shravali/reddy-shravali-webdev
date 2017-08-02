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
           // model.widget = widgetService.findWidgetById(model.widgetId);
            widgetService.findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = response.data;
                });
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }

        init();


        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId
                        + "/page/" + model.pageId + "/widget");
                });
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId)
                .then(function(response) {
                    var result=response.data;
                    if(result){
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId
                            + "/page/" + model.pageId + "/widget");
                    }
                    // else{
                    //     model.errorMessage = "User not found";
                    // }
                });


        }


    }

})();