var app = require('../express');

app.get("/api/test", findAllMessages);
app.post("/api/test", createMessage);
app.delete("/api/test/:id", deleteMessage);

var connectionString = 'mongodb://127.0.0.1:27017/test';

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

var TestSchema = mongoose.Schema({
    message: String
});

var TestModel = mongoose.model("TestModel", TestSchema);

function findAllMessages(req, res) {
    TestModel
        .find()
        .then(
            function(tests) {
                res.json(tests);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}

function createMessage(req, res) {
    TestModel
        .create(req.body)
        .then(
            function(test) {
                res.json(test);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}

function deleteMessage(req, res) {
    TestModel
        .remove({_id: req.params.id})
        .then(
            function(result) {
                res.json(result);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds149382.mlab.com:49382/heroku_86pj5q6n'; // user yours

}

