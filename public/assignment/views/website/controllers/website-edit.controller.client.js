(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];
        //var websiteId = $routeParams["wid"];
        model.websiteId = $routeParams["wid"];

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService.findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService.findWebsiteById(model.websiteId)
                .then(function (response) {
                    model.website = response.data;
                });
        }

        init();


        function updateWebsite(website) {
            websiteService.updateWebsite(model.websiteId, website);
                // .then(function () {
                //     $location.url("/user/" + model.userId + "/website");
                // });

        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId)
                .then(function(response) {
                    var result=response.data;
                    if(result){
                        $location.url('/user/' + model.userId + '/website');
                    }
                    // else{
                    //     model.errorMessage = "User not found";
                    // }
                });

        }


    }

})();
