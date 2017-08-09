var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
// var db = require('../database');
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget){
    widget._page = pageId;
    var widgetTemp = null;
    return widgetModel.create(widget)
        .then(function (widget) {
            widgetTemp = widget;
            return pageModel
                .addWidget(pageId, widget._id);
        })
        .then(function (widget) {
            return widgetTemp;
        });
}

function findAllWidgetsForPage(pageId){
    return widgetModel
        .find({_page: pageId})
        .populate('_page', 'name')
        .exec();
}

function findWidgetById(widgetId){
    return widgetModel.findById(widgetId);
}

function updateWidget (widgetId, widget){
    return widgetModel.update({_id: widgetId},
        {$set: widget});
}

function deleteWidget(widgetId){

}

function reorderWidget(pageId, start, end){

}
