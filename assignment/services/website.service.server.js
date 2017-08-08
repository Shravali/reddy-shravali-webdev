var app = require("../../express");
var websiteModel = require('../model/website/website.model.server');

var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

// http handlers
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);


function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
    // website._id = (new Date()).getTime() + "";
    //
    // websites.push(website);
    // res.json(website);
}

function findWebsiteById(req, res) {
    websiteModel
        .findWebsiteById(req.params.websiteId)
        .then(function (website) {
            res.json(website);
        },
        function (err) {
            res.sendStatus(404).send(err);
        });
    // for (var w in websites) {
    //     if (websites[w]._id === req.params.websiteId) {
    //         res.json(websites[w]);
    //     }
    // }
    //res.sendStatus(404);
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;

    websiteModel.findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        });
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for (var w in websites) {
    //     if (websites[w]._id === websiteId) {
    //         websites[w] = website;
    //         res.send(website);
    //         return;
    //     }
    // }
    //
    // res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;
    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            return userModel.removeWebsite(userId, websiteId);
        });
}
