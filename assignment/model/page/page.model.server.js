var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require('../website/website.model.server');
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
module.exports = pageModel;


function addWidget(pageId, widgetId) {
    return userModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}
function createPage(websiteId, page){
    page._website = websiteId;
   // return pageModel.create(page);
    var pageTemp = null;
    return pageModel.create(page)
        .then(function (page) {
            pageTemp = page;
            return websiteModel
                .addPage(websiteId, page._id);
        })
        .then(function (user) {
            return pageTemp;
        });

}

function findAllPagesForWebsite(websiteId){
    return pageModel
        .find({_website: websiteId})
        .populate('_website', 'name')
        .exec();
}

function findPageById(pageId){
    return pageModel.findById(pageId);

}

function updatePage(pageId, page){
    return pageModel.update({_id: pageId},
        {$set: page});

}

function deletePage(pageId) {

}