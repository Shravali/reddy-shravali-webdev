var app = require("../../express");
var widgetModel = require('../model/widget/widget.model.server');
var pageModel = require('../model/page/page.model.server');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });
// var widgets = [
//     {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     {
//         "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"
//     },
//     {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     {
//         "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E"
//     },
//     {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

// http handlers
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.put("/api/page/:pageId/widget", sortWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = '/uploads/' + filename;
            var callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
            res.redirect(callbackUrl);
        });

}

function sortWidget(req, res) {
    var pageId = req.params.pageId;
    var start = req.query.initial;
    var stop = req.query.final;
    widgetModel
        .reorderWidget(pageId, start, stop)
        .then(function (widgets) {
            console.log("sorted widgets");
            console.log(widgets);
            res.json(widgets)
        }, function (err) {
            res.sendStatus(500).send(err);
            console.log(err);

    });
}

function createWidget(req, res) {
    // var widget =
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        });

}

function findWidgetById(req, res) {
    widgetModel
        .findWidgetById(req.params.widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200);
        });


}