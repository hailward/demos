var tiles = {
  "osm-tiles": {
    "type": "raster",
    "tiles": [
      "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    ],
    "tileSize": 256
  },
  "amap-base-tiles": {
    "type": "raster",
    "tiles": [
      "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    ],
    "tileSize": 256
  },
  "amap-satellite-tiles": {
    "type": "raster",
    "tiles": [
      "http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    ],
  },
  "amap-road-tiles": {
    "type": "raster",
    "tiles": [
      "http://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
    ],
  },
}
var layers = {
  "osm-layer": {
    "id": "osm-layer",
    "type": "raster",
    "source": "osm-tiles",
    "minzoom": 0,
    "maxzoom": 22
  },
  "amap-base-layer": {
    "id": "amap-base-layer",
    "type": "raster",
    "source": "amap-base-tiles",
  },
  "amap-satellite-layer": {
    "id": "amap-satellite-layer",
    "type": "raster",
    "source": "amap-satellite-tiles",
  },
  "amap-road-layer": {
    "id": "amap-road-layer",
    "type": "raster",
    "source": "amap-road-tiles",
  },
}

var style = {
  "version": 8,
  // style: 'mapbox://styles/mapbox/basic-v9',
  // "sprite": "mapbox://sprites/mapbox/streets-v8",
  "sprite": window.location.origin + "/sprite/sprite",
  // "glyphs": "./fonts/{fontstack}/{range}.pbf",
  "sources": {
    "amap-base-tiles": tiles["amap-base-tiles"],
  },
  "layers": [
    layers['amap-base-layer']
  ]
}
// mapboxgl.accessToken = 'pk.eyJ1IjoibWpkYW5pZWxzb24iLCJhIjoiY2p2bzFlbnZ5MW5pbTN5cGJ2YWp2MW9vaiJ9.kAaZq3iyJwvrMLK7XDs_qw';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: style, // stylesheet location
  // center: [-79.942829, 40.443399], // starting position [lng, lat] 
  center: [110.228840, 19.868120],
  pitch: 45, // pitch in degrees
  // bearing: -180, // bearing in degrees
  zoom: 10 // starting zoom 
});

map.on('load', function () {
  console.log('loaded')
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
  }));
})
map.on('zoomend', function (e) {
  console.log('zoomend')
})