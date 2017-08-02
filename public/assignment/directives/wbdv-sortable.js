(function () {
    angular
        .module("WebAppMaker")
        .directive("sortableList", SortableList);

    function SortableList($http, $routeParams) {
        function linkFunction(scope, element) {
            console.log("inside link");
           // var findDiv = element.find("div");
            var initial = -1;
            $(element).sortable({
                start: function (event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function (event, ui) {
                    var final = $(ui.item).index();
                    console.log(final);
                    var pageId = $routeParams.pid;
                    $http.put("/api/page/" + pageId + "/widget?initial=" + initial + "&final=" + final)
                        .then(function(response) {
                            return response.data;
                        });
                }
            });
        }

        return {
            //templateUrl: "../views/widget/templates/widget-list.html",
            link: linkFunction
        }

    }

})();