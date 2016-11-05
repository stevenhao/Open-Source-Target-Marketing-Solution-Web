var App = require('./app');
var HeatMap = require('./heatmap');

m.route.mode = "hash";
m.route(document.body, "/heat", {
    "/": App,
    "/heat": HeatMap,
});
