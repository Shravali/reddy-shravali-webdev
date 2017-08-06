var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var db = require('../database');
var pageModel = mongoose.model("PageModel", pageSchema);
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageSchema;

function createPage(websiteId, page){
    page._website = websiteId;
    return pageModel.create(page);

}

function findAllPagesForWebsite(websiteId){

}

function findPageById(pageId){

}

function updatePage(pageId, page){

}

function deletePage(pageId) {

}