var L = require('leaflet');
var _ = require('lodash');

module.exports = function(map, config) {

  var layers = {};

  // create layers
  var _baseLayers = config.baseLayers;
  var _overlays = config.overlays;

  // base layers and overlays
  var baseLayers = layers.baseLayers = {};
  var overlays = layers.overlays = {};

  // create layer by config
  var firstLayer = null;
  var visibleLayer = null;


  var createLayer = function(name, conf, addIfVisible) {

    // type could be null, when come from localstorage
    if (conf && conf.type !== null) {

      // sent layer name in options
      conf.options = conf.options || {};
      conf.options.layerHeader = name;

      if (navigator.appVersion.indexOf("MSIE 8.") !== -1) {
        if (conf.options && conf.options.opacity) {
          conf.options.opacity = 1;
        }
      }

      var type = _.property(conf.type)(window);
      // create layer
      var layer = new type(conf.service, conf.options);

      // remember first layer
      if (firstLayer === null) {
        firstLayer = layer;
      }

      // add base layer to the map
      if (conf.visible === true) {

        // remember first visible layer, on case if other layers are also invisible we will make visible this one.
        if (visibleLayer === null) {
          visibleLayer = layer;
        }

        // usually for overlay layers (we need to add them no matter what)
        if (addIfVisible) {
          map.addLayer(layer);
        }
      }
      return layer;
    }

    alert("Service type for the Layer '" + name + "' not found.");

    return null;
  };


  // create baseLayers
  //===============================
  for (var bl in _baseLayers) {
    if ({}.hasOwnProperty.call(_baseLayers, bl)) {
      var layer = null;
      try {
        layer = createLayer(bl, _baseLayers[bl]);
      } catch (e) {
        console.warn('Can\'t initialize "' + bl + '" layer. No internet connection?');
      }
      if (layer !== null) {
        baseLayers[bl] = layer;
      }
    }
  }

  // make visible layer visible, or take first one and make visible
  visibleLayer = visibleLayer !== null ? visibleLayer : firstLayer;
  map.addLayer(visibleLayer, true);

  // create overlays
  //===============================
  for (var ov in _overlays) {
    if ({}.hasOwnProperty.call(_overlays, ov)) {
      var layer2 = null;
      try {
        layer2 = createLayer(ov, _overlays[ov]);
      } catch (e) {
        console.warn('Can\'t initialize "' + ov + '" layer. No internet connection?');
      }
      if (layer2 !== null) {
        overlays[ov] = layer2;
      }
    }
  }

  return layers;
};
