var MAPBOX = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicy13dSIsImEiOiJjaXY1Znh4b3AwMWlxMnV0amVtaWFydW80In0.Ew_tvrfwY0yD6R7pa4LLSw'
var OSM = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
var eps = 0.001

function drawHeatMap(locations) {
  function onMount(el) {
    var map = L.map(el).setView([51.505, -0.09], 18);
    L.tileLayer(MAPBOX, {
      maxZoom: 18
    }).addTo(map);

    var N = -200, S = 200;
    var E = -200, W = 200;

    function doBounds() {
      var bounds = L.latLngBounds(L.latLng(S-eps,W-eps), L.latLng(N+eps,E+eps));
      console.log('doing bounds', bounds);
      map.fitBounds(bounds);
    }

    console.log('setLocations', locations);
    var heatLayer = L.heatLayer(locations.map(function(loc) {
      console.log('loc', loc);
      N = Math.max(N, loc['latitude'])
      S = Math.min(S, loc['latitude'])
      E = Math.max(E, loc['longitude'])
      W = Math.min(W, loc['longitude'])
      L.marker(L.latLng(loc['latitude'],loc['longitude'])).addTo(map);
      return [loc['latitude'],loc['longitude'], loc['score']];
    }));
    heatLayer.addTo(map);

    doBounds();
  }

  var id = locations.join('');
  return m('.heatmap', {
    config: onMount,
    key: id,
  });
}


var HeatMap = {
  controller: function() {
    this.addr = m.prop('San Jose');
    this.query = m.prop('Sushi');
    this.getLocations = function() {
      return [
        {'latitude': 50.45, 'longitude': 30.67, 'score': 500},
        {'latitude': 50.46, 'longitude': 30.66, 'score': 300},
      ];
    };
    this.updateLocations = function() {
      m.beginComputation();
      console.log('todo hit server');
      m.endComputation();
    };
  },
  view: function(ctrl) {
    var locations = ctrl.getLocations();
    return m('div', [
      m('input', {
        value: ctrl.addr(),
        oninput: m.withAttr('value', ctrl.addr),
      }),
      m('input', {
        value: ctrl.query(),
        oninput: m.withAttr('value', ctrl.query),
      }),
      m('button', {
        onclick: m.updateLocations,
      }, 'Refresh the shit'),
      drawHeatMap(locations),
    ]);
  }
};

module.exports = HeatMap;
