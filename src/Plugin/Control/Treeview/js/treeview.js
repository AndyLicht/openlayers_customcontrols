Drupal.openlayers.pluginManager.register({
  fs: 'openlayers.Control:Treeview',
  init: function(data) {
    return new ol.control.treeviewControl(data.opt,data.map);
  }
});


