var measureControl = function(opt_options) {
    var options = opt_options || {};

    //Checkbox fuer das geodätische Messen
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'geodesic';
    var textgeo = document.createTextNode('Geodätisches messen');

    //Hinzufuegen der Schaltfläche fuer die Messarten
    var select = document.createElement('select');
    var opt1 = document.createElement('option');
    var opt2 = document.createElement('option');
    var textmeasure = document.createTextNode('Messart wählen');

    select.id = 'type';
    opt1.value = 'length';
    opt1.text = 'Strecke';
    opt2.value = 'area';
    opt2.text = 'Fläche';

    select.add(opt1, null);
    select.add(opt2, null);

    //Hinzufuegen der Element zum generierten div
    var element = document.createElement('div');
    element.className = 'alert-button ol-unselectable ol-control';
    element.appendChild(textmeasure);
    element.appendChild(select);
    element.appendChild(checkbox);
    element.appendChild(textgeo);

    ol.control.Control.call(this, {
	element: element,
	target: options.target
    });
};
ol.inherits(measureControl, ol.control.Control);

(function ($)
{
    Drupal.behaviors.loadmeasure =
    {
	attach: function (context, settings)
	{
	var map = null;
	var id = $('.openlayers-map').attr('id');
	jQuery(window).load(function()
	    {
		{
		$('.openlayers-map').each(function ()
		    {
		    map = Drupal.openlayers.getMapById(id).map;
		    //console.log(map);
		    });
		}
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

      var pointerMoveHandler = function(evt) {
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
//START
console.log(map);
map.on('pointermove', pointerMoveHandler);

$(map.getViewport()).on('mouseout', function() {
        $(helpTooltipElement).addClass('hidden');
      });

      var typeSelect = document.getElementById('type');
      var geodesicCheckbox = document.getElementById('geodesic');

// EDIT Source
      var source = new ol.source.Vector();
      var draw; // global so we can remove it later
      function addInteraction() {
        var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
        draw = new ol.interaction.Draw({
          source: source,
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
        map.addInteraction(draw);

        createMeasureTooltip();
        createHelpTooltip();

        var listener;
        draw.on('drawstart',
            function(evt) {
              // set sketch
              sketch = evt.feature;

              /** @type {ol.Coordinate|undefined} */
              var tooltipCoord = evt.coordinate;

              listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                  output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
                  tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                  output = formatLength( /** @type {ol.geom.LineString} */ (geom));
                  tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
              });
            }, this);

        draw.on('drawend',
            function(evt) {
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
        map.addOverlay(helpTooltip);
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
      typeSelect.onchange = function(e) {
        map.removeInteraction(draw);
        addInteraction();
      };


      /**
       * format length output
       * @param {ol.geom.LineString} line
       * @return {string}
       */
      var formatLength = function(line) {
        var length;
        if (geodesicCheckbox.checked) {
          var coordinates = line.getCoordinates();
          length = 0;
          var sourceProj = map.getView().getProjection();
          for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length += wgs84Sphere.haversineDistance(c1, c2);
          }
        } else {
          length = Math.round(line.getLength() * 100) / 100;
        }
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
      var formatArea = function(polygon) {
        var area;
        if (geodesicCheckbox.checked) {
          var sourceProj = map.getView().getProjection();
          var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
              sourceProj, 'EPSG:4326'));
          var coordinates = geom.getLinearRing(0).getCoordinates();
          area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
        } else {
          area = polygon.getArea();
        }
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
//STOP
	    })
	}
    }
})(jQuery);
