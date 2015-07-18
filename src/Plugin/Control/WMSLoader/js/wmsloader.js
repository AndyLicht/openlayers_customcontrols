Drupal.openlayers.pluginManager.register({
  fs: 'openlayers.Control:WMSLoader',
  init: function(data) {
    return new wmsloaderControl(data.opt,data.map);
  }
});


