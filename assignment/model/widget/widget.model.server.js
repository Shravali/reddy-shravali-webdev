var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var db = require('../database');
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetSchema;

function createWidget(pageId, widget){

}

function findAllWidgetsForPage(pageId){

}

function findWidgetById(widgetId){

}

function updateWidget (widgetId, widget){

}

function deleteWidget(widgetId){

}

function reorderWidget(pageId, start, end){

}
