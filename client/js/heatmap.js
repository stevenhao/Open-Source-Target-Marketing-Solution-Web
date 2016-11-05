var MAPBOX = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicy13dSIsImEiOiJjaXY1Znh4b3AwMWlxMnV0amVtaWFydW80In0.Ew_tvrfwY0yD6R7pa4LLSw'
var OSM = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'

var HeatMap = {
  controller: function() {
    var map;
    this.setMap = function(_map) { map = _map; };
    this.getMap = function() { return map };
  },
  view: function(ctrl) {
    var map = ctrl.getMap();
    return m('.heatmap', {
        config: function(el) {
          var map = L.map(el).setView([51.505, -0.09], 13);
          L.tileLayer(MAPBOX , {
          }).addTo(map);

          ctrl.setMap(map);
        }
      }, [
      m('div', 'This is the heat map.'),
      m('.map#map', m('div', 'This is the heat map container')),
    ]);
  }
};

module.exports = HeatMap;
