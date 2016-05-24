//Hinzufügen der Schaltflächen für die Oberfläche
var measureControl = function (opt_options) {
    var options = opt_options || {};

    //Checkbox fuer das geodätische Messen
    /*
     var checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.id = 'geodesic';
     var textgeo = document.createTextNode(' Geodätisch messen ');
     */

    //Leerzeichenfeld
    //var blank = document.createTextNode(' '); 

    //Hinzufuegen der Schaltfläche fuer die Messarten
    var select = document.createElement('select');
    var opt1 = document.createElement('option');
    var opt2 = document.createElement('option');
    //var textmeasure = document.createTextNode('Messart ');

    select.id = 'type';
    opt1.value = 'length';
    opt1.text = 'Strecke';
    opt2.value = 'area';
    opt2.text = 'Fläche';

    select.add(opt1, null);
    select.add(opt2, null);

    var activatebutton = document.createElement('input');
    activatebutton.type = 'button';
    activatebutton.id = 'activate-measure';
    activatebutton.value = 'Messen';

    var deactivatebutton = document.createElement('input');
    deactivatebutton.type = 'button';
    deactivatebutton.id = 'deactivate-measure';
    deactivatebutton.value = 'Beenden';

    //Hinzufuegen eines Delete-Buttons
    var deletemeasure = document.createElement('input');
    deletemeasure.type = 'button';
    deletemeasure.id = 'delete-measure';
    deletemeasure.value = 'Löschen'; //Löschen
    //var textdelete = document.createTextNode('Löschen');


    //Hinzufuegen der Element zum generierten div
    var element = document.createElement('div');
    element.className = 'measure-tool ol-unselectable ol-control';
    element.id = 'measure-tool';

    var element2 = document.createElement('div');
    element2.className = 'measure-tool-activate ol-unselectable ol-control';
    element2.id = 'measure-tool-activate';


    //Button zum aktivieren des Messwerkzeugs
    element2.appendChild(activatebutton);

    element2.appendChild(element);
    //element.appendChild(textmeasure);
    element.appendChild(select);
    //element.appendChild(textgeo);
    //element.appendChild(checkbox);
    //element.appendChild(textdelete);
    element.appendChild(deletemeasure);
    //element.appendChild(blank);
    element.appendChild(deactivatebutton);

    //OL3-Call der Schaltflächen
    ol.control.Control.call(this, {
        element: element2,
        target: options.target
    });
};


//Funktionen
ol.inherits(measureControl, ol.control.Control);

(function ($)
{
    Drupal.behaviors.loadmeasure =
            {
                attach: function (context, settings)
                {

                    jQuery(window).load(function () {

                        //Anzeigen/Verbergen des Messschaltfläche
                        $("#measure-tool").hide();

                        $('#activate-measure').click(function () {
                            $('#activate-measure').hide();  //Messstart ausblenden
                            $("#measure-tool").show();      //Messtool anzeigen
                            $(".tooltip-measure").show();   //Tooltip einblenden
                            $('.tooltip-static').show();    //Messergebnis einblenden
                            vector_measure.set('visible', true);    //gezeichnete Vektoren sichtbar machen
                            map.addOverlay(helpTooltip);    //Textbox "Zum messen..." zur map hinzufügen
                            map.addInteraction(draw);       //Strecke zeichnen zur map hinzufügen
                        });

                        $('#deactivate-measure').click(function () {
                            $('#activate-measure').show();
                            $("#measure-tool").hide();
                            $(".tooltip-measure").hide();
                            map.removeOverlay(helpTooltip);
                            map.removeInteraction(draw);
                            $('.tooltip-static').hide();
                            vector_measure.set('visible', false);
                        });

                        //Entfernen der Messergebnisse
                        $('#delete-measure').click(function () {
                            $('.tooltip-static').remove();
                            source_measure.clear();
                        });

                        var map = null;
                        var id = $('.openlayers-map').attr('id');
                        {
                            $('.openlayers-map').each(function ()
                            {
                                layers = Drupal.openlayers.getMapById(id).layers;
                                map = Drupal.openlayers.getMapById(id).map;
                            });
                        }

                        var wgs84Sphere = new ol.Sphere(6378137);

                        var source_measure = new ol.source.Vector();
                        //layer "vector" wird zwar definiert, jedoch nicht in die Drupal-Map eingetragen
                        var vector_measure = new ol.layer.Vector({
                            source: source_measure,
                            name: 'layer_measure',
                            style: new ol.style.Style({
                                fill: new ol.style.Fill({
                                    color: 'rgba(255, 255, 255, 0.2)'   //Flächenfüllung nach Messung
                                }),
                                stroke: new ol.style.Stroke({
                                    color: 'red', //Farbe der Linien nach Messung
                                    width: 2
                                }),
                                image: new ol.style.Circle({
                                    radius: 7,
                                    fill: new ol.style.Fill({//Farbe Kreis
                                        color: '#ffcc33'
                                    })
                                })
                            })
                        });
                        map.addLayer(vector_measure);

                        /**
                         * Currently drawn feature.
                         * @type {ol.Feature}
                         */
                        var sketch;

                        /**
                         * The help tooltip element.
                         * @type {Element}
                         */
                        var helpTooltipElement;

                        /**
                         * Overlay to show the help messages.
                         * @type {ol.Overlay}
                         */
                        var helpTooltip;

                        /**
                         * The measure tooltip element.
                         * @type {Element}
                         */
                        var measureTooltipElement;

                        /**
                         * Overlay to show the measurement.
                         * @type {ol.Overlay}
                         */
                        var measureTooltip;

                        /**
                         * Message to show when the user is drawing a polygon.
                         * @type {string}
                         */
                        var continuePolygonMsg = 'Klicken um eine Fläche zu messen';

                        /**
                         * Message to show when the user is drawing a line.
                         * @type {string}
                         */
                        var continueLineMsg = 'Klicken um einen Linienzug zu messen';

                        var pointerMoveHandler = function (evt) {
                            if (evt.dragging) {
                                return;
                            }
                            /** @type {string} */
                            var helpMsg = 'Klicken um Messung zu starten';

                            if (sketch) {
                                var geom = (sketch.getGeometry());
                                if (geom instanceof ol.geom.Polygon) {
                                    helpMsg = continuePolygonMsg;
                                } else if (geom instanceof ol.geom.LineString) {
                                    helpMsg = continueLineMsg;
                                }
                            }
                            helpTooltipElement.innerHTML = helpMsg;
                            helpTooltip.setPosition(evt.coordinate);
                            $(helpTooltipElement).removeClass('hidden');
                        };

                        map.on('pointermove', pointerMoveHandler);

                        $(map.getViewport()).on('mouseout', function () {
                            $(helpTooltipElement).addClass('hidden');
                        });

                        var typeSelect = document.getElementById('type');
                        //var geodesicCheckbox = document.getElementById('geodesic');

                        //Hier wird das "zeichnen" aktiviert. Muss On/Off geschaltet werden können!
                        var draw; // global so we can remove it later
                        function addInteraction() {
                            var type = (typeSelect.value === 'area' ? 'Polygon' : 'LineString');
                            draw = new ol.interaction.Draw({
                                source: source_measure,
                                type: /** @type {ol.geom.GeometryType} */ (type),
                                style: new ol.style.Style({
                                    fill: new ol.style.Fill({
                                        color: 'rgba(255, 255, 255, 0.2)'
                                    }),
                                    stroke: new ol.style.Stroke({
                                        color: 'rgba(0, 0, 0, 0.5)',
                                        lineDash: [10, 10],
                                        width: 2
                                    }),
                                    image: new ol.style.Circle({
                                        radius: 5,
                                        stroke: new ol.style.Stroke({
                                            color: 'rgba(0, 0, 0, 0.7)'
                                        }),
                                        fill: new ol.style.Fill({
                                            color: 'rgba(255, 255, 255, 0.2)'
                                        })
                                    })
                                })
                            });
                            //map.addInteraction(draw);

                            createMeasureTooltip();
                            createHelpTooltip();

                            var listener;
                            draw.on('drawstart',
                                    function (evt) {
                                        // set sketch
                                        sketch = evt.feature;

                                        /** @type {ol.Coordinate|undefined} */
                                        var tooltipCoord = evt.coordinate;

                                        listener = sketch.getGeometry().on('change', function (evt) {
                                            var geom = evt.target;
                                            var output;
                                            if (geom instanceof ol.geom.Polygon) {
                                                output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
                                                tooltipCoord = geom.getInteriorPoint().getCoordinates();
                                            } else if (geom instanceof ol.geom.LineString) {
                                                output = formatLength(/** @type {ol.geom.LineString} */ (geom));
                                                tooltipCoord = geom.getLastCoordinate();
                                            }
                                            measureTooltipElement.innerHTML = output;
                                            measureTooltip.setPosition(tooltipCoord);
                                        });
                                    }, this);

                            draw.on('drawend',
                                    function (evt) {
                                        measureTooltipElement.className = 'tooltip tooltip-static';
                                        measureTooltip.setOffset([0, -7]);
                                        // unset sketch
                                        sketch = null;
                                        // unset tooltip so that a new one can be created
                                        measureTooltipElement = null;
                                        createMeasureTooltip();
                                        ol.Observable.unByKey(listener);
                                    }, this);
                        }

                        /**
                         * Creates a new help tooltip
                         */
                        function createHelpTooltip() {
                            if (helpTooltipElement) {
                                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
                            }
                            helpTooltipElement = document.createElement('div');
                            helpTooltipElement.className = 'tooltip hidden';
                            helpTooltip = new ol.Overlay({
                                element: helpTooltipElement,
                                offset: [15, 0],
                                positioning: 'center-left'
                            });
                            //map.addOverlay(helpTooltip);
                        }

                        /**
                         * Creates a new measure tooltip
                         */
                        function createMeasureTooltip() {
                            if (measureTooltipElement) {
                                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
                            }
                            measureTooltipElement = document.createElement('div');
                            measureTooltipElement.className = 'tooltip tooltip-measure';
                            measureTooltip = new ol.Overlay({
                                element: measureTooltipElement,
                                offset: [0, -15],
                                positioning: 'bottom-center'
                            });
                            map.addOverlay(measureTooltip);
                        }

                        /**
                         * Let user change the geometry type.
                         * @param {Event} e Change event.
                         */
                        typeSelect.onchange = function (e) {
                            map.removeInteraction(draw);
                            addInteraction();
                            map.addInteraction(draw);
                        };

                        /**
                         * format length output
                         * @param {ol.geom.LineString} line
                         * @return {string}
                         */
                        var formatLength = function (line) {
                            var length;
                            //if (geodesicCheckbox.checked) {
                            var coordinates = line.getCoordinates();
                            length = 0;
                            var sourceProj = map.getView().getProjection();
                            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                                var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
                                var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
                                length += wgs84Sphere.haversineDistance(c1, c2);
                            }
                            //} 
                            //else {
                            //  length = Math.round(line.getLength() * 100) / 100;
                            //}
                            var output;
                            if (length > 100) {
                                output = (Math.round(length / 1000 * 100) / 100) +
                                        ' ' + 'km';
                            } else {
                                output = (Math.round(length * 100) / 100) +
                                        ' ' + 'm';
                            }
                            return output;
                        };

                        /**
                         * format length output
                         * @param {ol.geom.Polygon} polygon
                         * @return {string}
                         */
                        var formatArea = function (polygon) {
                            var area;
                            //if (geodesicCheckbox.checked) {
                            var sourceProj = map.getView().getProjection();
                            var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
                                    sourceProj, 'EPSG:4326'));
                            var coordinates = geom.getLinearRing(0).getCoordinates();
                            area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
                            //} 
                            //else {
                            //  area = polygon.getArea();
                            //}
                            var output;
                            if (area > 10000) {
                                output = (Math.round(area / 1000000 * 100) / 100) +
                                        ' ' + 'km<sup>2</sup>';
                            } else {
                                output = (Math.round(area * 100) / 100) +
                                        ' ' + 'm<sup>2</sup>';
                            }
                            return output;
                        };

                        addInteraction();

                    });
                }
            };
})(jQuery);