var client = require('./client')

var MAPBOX = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicy13dSIsImEiOiJjaXY1Znh4b3AwMWlxMnV0amVtaWFydW80In0.Ew_tvrfwY0yD6R7pa4LLSw'
var OSM = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
var eps = 0.001

var map;
function drawHeatMap(odd, locations) {
  function onMount(el) {
    if (map) {
      map.off();
      map.remove();
    }
    console.log('mounted');
    map = new L.map(el).setView([51.505, -0.09], 18);
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
      return [loc['latitude'],loc['longitude'], loc['score']/7.];
    }), {radius: 150});
    heatLayer.addTo(map);

    doBounds();
  }

  return m('.heatmap', {
    config: onMount,
    key: odd,
  });
}


var odd = 0;
var HeatMap = {
  controller: function() {
    var addr = m.prop('422 Delaware Ave, Wilmington, DE 19801');
    var query = m.prop('sushi');
    var locations = m.prop([
        {'latitude': 50.45, 'longitude': 30.67, 'score': 500},
        {'latitude': 50.46, 'longitude': 30.66, 'score': 300},
      ]);
    this.getLocations = function() {
      return locations();
    };

    this.updateLocations = function() {
      console.log('todo hit server');
      m.startComputation();

      client.run('set_address', [addr(), query().split()], function(err, res) {
        console.log('set address ok', res.result);
        client.run('get_businesses', [], function(err, res) {
          var error = res.error;
          var result = res.result;

          console.log('got result', result);
          odd++;
          odd %= 2;
          locations(result);
          m.endComputation();
          m.redraw(true);
        })
      })
    };

    this.addr = addr;
    this.query = query;
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
        onclick: ctrl.updateLocations,
      }, 'Refresh'),
      drawHeatMap(odd, locations),
    ]);
  }
};

module.exports = HeatMap;
