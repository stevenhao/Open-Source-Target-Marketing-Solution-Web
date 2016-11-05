var MAPBOX = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicy13dSIsImEiOiJjaXY1Znh4b3AwMWlxMnV0amVtaWFydW80In0.Ew_tvrfwY0yD6R7pa4LLSw'

var mymap = L.map('mapid').setView([50.5, 30.4], 13);

L.tileLayer(MAPBOX, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);

L.heatLayer([
    [50.5, 30.5, 200],
    [50.4, 30.4, 5000]
    ]).addTo(mymap);

