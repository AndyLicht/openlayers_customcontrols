Drupal.openlayers.pluginManager.register({
  fs: 'openlayers.Control:Alert',
  init: function(data) {
    return new alertControl(data.opt);
  }
});


