
module.exports = function (map, config) {

  var addLayers = require('./addLayers');

  var layers = addLayers(map, config);

  map.panTo(config.center);
  map.setZoom(config.zoom);

  return layers;
};
