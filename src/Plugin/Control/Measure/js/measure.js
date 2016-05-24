Drupal.openlayers.pluginManager.register({
    fs: 'openlayers.Control:Measure',
    init: function (data) {
        //Wird nur verwendet wenn auch wirklich control-buttons angelegt werden.
        return new measureControl(data.opt);
        //Bsp fuer eine einfach OL3-Control Einbindung
        //return new ol.control.FullScreen(data.opt);
        //Nur zum testen.
        //console.log(data.map);
    }
});