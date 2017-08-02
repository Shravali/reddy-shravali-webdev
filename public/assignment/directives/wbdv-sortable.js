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
                    // console.log();
                    initial = $(ui.item).index();
                    console.log(initial);
                },
                stop: function (event, ui) {
                    var final = $(ui.item).index();
                    console.log(final);
                    var pageId = $routeParams.pid;
                    $http.put("/page/" + pageId + "/widget?initial=" + initial + "&final=" + final);
                }
            });
        }

        return {
            //templateUrl: "../views/widget/templates/widget-list.html",
            link: linkFunction
        }

    }

})();