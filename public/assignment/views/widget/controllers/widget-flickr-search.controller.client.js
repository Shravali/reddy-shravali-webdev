(function () {

    angular
        .module("WebAppMaker")
        .controller("ImageSearchController", ImageSearchController);
    function ImageSearchController($routeParams, FlickrService , $location, widgetService) {
        var model = this;
        model.widgetId = $routeParams["wgid"];
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;


        function init() {

        }

        init();

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {"_page": model.pageId, "url": url, "width": "100%", "type": "IMAGE"};

            var widgetId = $routeParams['widgetId'];
            widgetService
                .createWidget(model.pageId, widget)
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