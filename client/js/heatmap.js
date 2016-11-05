var Leaflet = (function() {
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicy13dSIsImEiOiJjaXY1Znh4b3AwMWlxMnV0amVtaWFydW80In0.Ew_tvrfwY0yD6R7pa4LLSw', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

});

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();var heat = L.heatLayer([
    [50.5, 30.5, 0.2], // lat, lng, intensity
    [50.6, 30.4, 0.5],
], {radius: 25}).addTo(map);



var HeatMap = {
  controller: function() {
  },
  view: function() {
    return m('div',
      'This is the heat map.'
    );
  }
};

module.exports = HeatMap;
