console.log("hello");

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/webdev_summer2_2017');
var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        dateCreated: {type: Date, default: Date.now()}
}, {collection: "user"});

var userModel = mongoose.model("UserModel", userSchema);

removeUser("59825a95f88c0a30080b028b")
    .then(function (status) {
        console.log(status);
    });

updateUser("59825a95f88c0a30080b028b", {firstName: 'Alice', lastName: 'Wonderland'})
    .then(function (status) {
       console.log(status);
    });

function updateUser(userId, newUserValues) {
    return userModel.update({_id: userId}, {$set: {
        firstName: newUserValues.firstName,
        lastName: newUserValues.lastName
        //newUserValues
    }});
}

findUserById("")
    .then(function (user) {
        console.log(user);
    });
findUserByUsername("alice")
    .then(function (user) {
        console.log(user);
    });



findAllUsers()
    .then(function (users) {
    console.log(users);
});
createUser({username: 'bob'});

function findUserById(id) {
    return userModel.findById(id);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findAllUsers(){
    // userModel.find(function (err, docs) {
    //     console.log(docs)
    // });
    return userModel.find();
}


function createUser(user) {
    userModel.create(user, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    });
}