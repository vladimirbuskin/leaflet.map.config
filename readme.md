

# Leaflet Config example #




```javascript
var config = {

    // start latitude, longitude
    center: [37.694237, -122.086600],

    // start zoom level
    zoom: 15,

    //================================================================================
    // Base Layers
    //================================================================================
    baseLayers: {

        "Open Street Map":
        {
            type: "L.TileLayer",
            service: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            options: {
                attribution: "OSM &copy;"
            }
        },

        "Bing Satellite":
        {

            type: "L.BingLayer",
            service: "AjyvwwoncG-n9qnf7Dpzae8NFXg_hBN1p2rMmzgfcze9owomwjF2xp3COllSGytl",
            options: {
                type: 'aerial' // road, aerial
            }
        },

        "No Imagery":
        {
            type: "L.EmptyLayer",
            visible: true
        }

    },

    //================================================================================
    // Overlays
    //================================================================================
    overlays: {

        "ArcGis Pleasanton":
        {
            type: "L.MSLayerSelectable",
            service: 'http://g1.maintstar.com:6080/arcgis/rest/services/Pleasanton_gis1/MapServer',
            visible: true,
            options: {
                maxZoom: 30,
                opacity: 0.9,
                attribution: "Pleasanton data &copy;",
                loadLegend: false,
                adapter: "L.MSAdapter.EsriDynamic",
                geometryServer: 'http://g1.maintstar.com:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer',
                layersConfig: [
                    { name: "TreeInventory", type: "number", idField: "TREEID" },
                    { name: "Trails", type: "number", idField: "OBJECTID" }
                ]
            }
        },

        "Google Maps":
        {
            type: "L.MSLayerSelectable",
            // development url
            service: '',
            //service: 'http://api06.dev.openstreetmap.org/',
            // live url
            //service: 'http://api.openstreetmap.org/',
            visible: true,
            options: {
                opacity: 0.7,
                //attribution: "My data &copy;", // who cares, for our own service
                loadLegend: false,
                adapter: "L.MSAdapter.Google",
                //geometryServer: 'http://g3.maintstar.com/ArcGIS/rest/services/Geometry/GeometryServer',
                layersConfig: [
                    { name: "Google Address", type: "text", idField: "name" }
                ]
            }
        },

        "MS GIS permit":
        {
            type: "L.MSLayerSelectable",
            service: 'http://permitsales.maintstar.com/demo2/mapsvc/',
            visible: true,
            options: {
                opacity: 0.7,
                //attribution: "My data &copy;", // who cares, for our own service
                loadLegend: false,
                adapter: "L.MSAdapter.MSMap",
                geometryServer: 'http://g1.maintstar.com:6080/ArcGIS/rest/services/Geometry/GeometryServer'
            }
        }
    }

};

var configure = require('leaflet.map.config').configure;

// create layers by config
var layers = configure(map, config);

// add layers control
L.control.layers(layers.baseLayers, layers.overlays).addTo(map);

'''
