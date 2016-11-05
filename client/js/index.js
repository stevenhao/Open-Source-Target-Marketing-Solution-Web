var App = require('./app');
var HeatMap = require('./heatmap');
var Options = require('./Options');

m.route.mode = "hash";
m.route(document.body, "/options", {
    "/": App,
    "/heat": HeatMap,
    "/options": Options,
});
