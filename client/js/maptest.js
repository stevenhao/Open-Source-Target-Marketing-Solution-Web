var MAPBOX = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicy13dSIsImEiOiJjaXY1Znh4b3AwMWlxMnV0amVtaWFydW80In0.Ew_tvrfwY0yD6R7pa4LLSw'

var mymap = L.map('mapid');

L.tileLayer(MAPBOX, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);

var foundLocations = [
    {'latitude': 50.45, 'longitude': 30.67, 'score': 500},
    {'latitude': 50.46, 'longitude': 30.66, 'score': 300},
]

var N = -200, S = 200;
var E = -200, W = 200;
var eps = 0.001

var heatInput = []
for (loc of foundLocations){
    N = Math.max(N, loc['latitude'])
    S = Math.min(S, loc['latitude'])
    E = Math.max(E, loc['longitude'])
    W = Math.min(W, loc['longitude'])

    heatInput.push([loc['latitude'],loc['longitude'], loc['score']]);
    L.marker(L.latLng(loc['latitude'],loc['longitude'])).addTo(mymap);
}

L.heatLayer(heatInput).addTo(mymap);

bounds = L.latLngBounds(L.latLng(S-eps,W-eps), L.latLng(N+eps,E+eps));
mymap.fitBounds(bounds);
