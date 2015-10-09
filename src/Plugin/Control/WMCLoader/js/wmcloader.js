Drupal.openlayers.pluginManager.register({
  fs: 'openlayers.Control:WMCLoader',
  init: function(data) {
    return new wmcloaderControl(data.opt,data.map);
  }
});


