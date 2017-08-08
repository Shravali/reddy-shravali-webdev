var app = require("../../express");
var pageModel = require('../model/page/page.model.server');


// http handlers
app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    pageModel.findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        });

}

function findPageById(req, res) {
    pageModel
        .findPageById(req.params.pageId)
        .then(function (page) {
            res.json(page);
        });
    // for (var p in pages) {
    //     if (pages[p]._id === pageId) {
    //         res.json(pages[p]);
    //     }
    // }
    // res.sendStatus(404);

}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}
function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        });
    // for (var p in pages) {
    //     if (pages[p]._id === pageId) {
    //         pages.splice(p, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);

}

