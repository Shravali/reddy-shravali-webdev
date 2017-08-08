var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
// var db = require('../database');
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;

module.exports = websiteModel;


function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });

}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website){
    return websiteModel.update({_id: websiteId},
        {$set: website});
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    var websiteTemp = null;
    return websiteModel.create(website)
        .then(function (website) {
            websiteTemp = website;
            return userModel
                .addWebsite(userId, website._id);
        })
        .then(function (user) {
            return websiteTemp;
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function deleteWebsite(userId,
                       websiteId) {
    return websiteModel.remove({_id: websiteId})
        .then(function (status) {
            userModel.removeWebsite(websiteId);
        });
        // .remove({_id: websiteId})
        // .then(function (status) {
        //     return userModel
        //         .removeWebsite(userId, websiteId);
        // });
}