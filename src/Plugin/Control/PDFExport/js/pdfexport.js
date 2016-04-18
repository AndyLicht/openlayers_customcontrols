Drupal.openlayers.pluginManager.register({
  fs: 'openlayers.Control:PDFExport',
  init: function(data) {
    return new  ol.control.pdfexportControl(data.opt, data.map);
  }
});


