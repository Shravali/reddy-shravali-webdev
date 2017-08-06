var app = require("../../express");
var userModel = require('../model/user/user.model.server');
var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", isAdmin: true},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

// http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUserByCredentials);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId/", deleteUser);

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
           res.sendStatus(404).send(err);
        });

}

function deleteUser(req, res) {
    var userId=req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
           res.json(user);
        });
    // user._id = (new Date()).getTime() + "";
    // users.push(user);
    // console.log(req.body);
    // res.send(user);
}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        return;
    } else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        return;

    }
    res.send("0");
}

function findUserByUsername(req, res) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function getAllUsers(req, response) {
    response.send(users);
}

function findUserById(req, response) {
    userModel
        .findUserById(req.params.userId)
        //when it comes back from database
        .then(function (user) {
            response.json(user);
        });

}
