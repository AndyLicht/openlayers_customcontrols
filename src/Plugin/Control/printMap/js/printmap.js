Drupal.openlayers.pluginManager.register({
  fs: 'openlayers.Control:printMap',
  init: function(data) {
    return new printMapControl(data.opt);
  }
});


