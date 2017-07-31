var app = require("../../express");
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
    website.developerId = userId;
    website._id = (new Date()).getTime() + "";

    websites.push(website);
    res.json(website);
}

function findWebsiteById(req, res) {
    for (var w in websites) {
        if (websites[w]._id === req.params.websiteId) {
            res.json(websites[w]);
        }
    }
    //res.sendStatus(404);
}

function findAllWebsitesForUser(req, res) {
   var userId = req.params.userId;

    var sites = [];

    for (var w in websites) {
        if (websites[w].developerId === userId) {
            sites.push(websites[w]);
        }
    }

    res.json(sites);
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            websites[w] = website;
            res.send(website);
            return;
        }
    }

    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            websites.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    // return false;
    res.sendStatus(404);
}
