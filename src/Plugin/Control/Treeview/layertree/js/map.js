/* Layers aus WMS (Tile) und anderen Services definieren ***************************************************** */
var baselayer1 = new ol.layer.Tile({
	source: new ol.source.MapQuest({
		layer: 'sat',
		})
	})
	baselayer1.set('name','MQBaselayer');
	baselayer1.set('base',true);
	baselayer1.set('group','none');
        baselayer1.set('uid', guid());
	
var baselayer2 = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'http://sg.geodatenzentrum.de/wms_webatlasde',
			params: {LAYERS: 'webatlasde'},
		})
	}) 
	baselayer2.set('name','WebatlasDE');
	baselayer2.set('base',true);
	baselayer2.set('group','none');
        baselayer2.set('uid', guid());
	
var baselayer3 = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'http://sg.geodatenzentrum.de/wms_webatlasde_grau',
			params: {LAYERS: 'webatlasde_grau'},
		})
	})
	baselayer3.set('name','WebatlasDE Grau');
	baselayer3.set('base',true);
	baselayer3.set('group','none');
        baselayer3.set('uid', guid());
	
var baselayer4 = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'http://sg.geodatenzentrum.de/wms_dop',
			params: {LAYERS: 'rgb'},
		})
	})
	baselayer4.set('name','DOP20');
	baselayer4.set('base',true);
	baselayer4.set('group','none');
        baselayer4.set('uid', guid());
       
/* BASELAYER ENDE ***********************************************************************************************/

//TRANSFORMIERUNGS-BEISPIEL

/* //GetCapa-Parsing: Funktioniert nur mit dem Chorme-Plugin: Access-Control-Expose-Headers!
    var parser = new ol.format.WMSCapabilities();
    $.ajax(capaurl).then(function(response) {
        var result = parser.read(response);
        //$('#log').html(window.JSON.stringify(result, null, 2));
        console.log(result);
    });
*/

//Transformierung muss, wenn noetig da kein EPSG: 3857 gegeben, schon hier stattfinden!
//EPSG:4326 kann hier IMMER aus EX_GeograhicBB eingeparst werden, muss dann aber sofort transformiert werden, Layer wird sonst nicht dargestellt.

var extent2 = [9.98089,51.9798,11.3744,52.8173]; //INPUT als 4326 von EX_GeograhicBB!
//console.log(extent2);
// IF SCHLEIFE! Falls EPSG: 3857 schon gegeben ist! -> "IF ("BounddingBox CRS="EPSG:3857"")=undefined)DO TransformOfEx_GeographicBB
var extent2 = ol.proj.transformExtent(extent2, 'EPSG:4326', 'EPSG:3857');
//console.log(extent2);

var layer1 = new ol.layer.Tile({
    
                //extent: [a,b,c,d] - nach EPSG:4326 - [a = miny = west, 
                //                                      b = minx = south, 
                //                                      c = maxy = east,
                //                                      d = maxx = north]
                                                                              
                //extent: [a,b,c,d] - nach CRS:84 - [a = minx, b = miny, c = maxx, d = maxy] 
		extent: [-13884991, 2870341, -7455066, 6338219], //Angaben in EPSG:3857, fuer OL3 default Projection!
		source: new ol.source.TileWMS({
			url: 'http://demo.boundlessgeo.com/geoserver/wms',
			params: {LAYERS: 'topp:states', TILED: true},
			serverType: 'geoserver' //OPTIONAL!
		})
	})
	layer1.set('name','topp:states');
	layer1.set('title','Bundesstaaten USA');
	layer1.set('group','Übersicht Bundesstaaten USA');
	layer1.set('base',false);
        layer1.set('uid', guid());
	layer1.setVisible(true); //default = true
	layer1.setOpacity(1);  
        
var layer2 = new ol.layer.Tile({
                //extent: [1111067.59246, 6796473.85908, 1266192.41608, 6949274.60924], //EPSG:3857, umgerechnet mit http://cs2cs.mygeodata.eu/
                extent: extent2,
		source: new ol.source.TileWMS({
			url: 'http://www.bgr.de/service/bodenkunde/buek200_3926mg/v1.7/index.php',
			params: {'LAYERS': 'buek200_3926mg_v17_polygons'},
                        //projection: 'EPSG:4326', //4326 könnte hier geparst werden, damit EPSG-Code bekannt ist.
			})
	})
	layer2.set('name','buek200_3926mg_v17_polygons');
	layer2.set('title','BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodenpolygone'); //Title des einzelnen "unter"-Layers
	layer2.set('group','BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7'); //Title des Layer oder des WMS (besser der des Layer)
	layer2.set('base',false);
        layer2.set('uid', guid());
	layer2.setVisible(true);
	layer2.setOpacity(1);

var layer3 = new ol.layer.Tile({
                extent: [1111067.59246, 6796473.85908, 1266192.41608, 6949274.60924],
		source: new ol.source.TileWMS({
			url: 'http://www.bgr.de/service/bodenkunde/buek200_3926mg/v1.7/index.php',
			params: {'LAYERS': 'buek200_3926mg_v17_arcs'}
			})
	})
	layer3.set('name','buek200_3926mg_v17_arcs');
	layer3.set('title','BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodengrenzen');
	layer3.set('group','BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7');
	layer3.set('base',false);
        layer3.set('uid', guid());
	layer3.setVisible(true);
	layer3.setOpacity(1);

var layer4 = new ol.layer.Tile({
                extent: [1111067.59246, 6796473.85908, 1266192.41608, 6949274.60924],
		source: new ol.source.TileWMS({
			url: 'http://www.bgr.de/service/bodenkunde/buek200_3926mg/v1.7/index.php',
			params: {'LAYERS': 'buek200_3926mg_v17_labels'}
			})
	})
	layer4.set('name','buek200_3926mg_v17_labels');
	layer4.set('title','BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Referenzpunkte');
	layer4.set('group','BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7');
	layer4.set('base',false);
        layer4.set('uid', guid());
	layer4.setVisible(true);
	layer4.setOpacity(1);
	
var layer5 = new ol.layer.Tile({
                //extent: [3.345619, 47.131243, 15.611836, 56.087060],
                extent: [372432.565269, 5963522.697400, 1737901.623463, 7575766.377477],
		source: new ol.source.TileWMS({
			url: 'https://services.bgr.de/wms/geologie/igme5000de',
			params: {LAYERS: '0'}
			})
	})
	layer5.set('name','0');
	layer5.set('title','IGME5000 Alter');
	layer5.set('group','Internationale Geologische Karte von Europa und angrenzender Gebiete im Maßstab 1 zu 5000000 - Ausschnitt Deutschland');
	layer5.set('base',false);
        layer5.set('uid', guid());
	layer5.setVisible(true);
	layer5.setOpacity(0.33);
	
/* Beispiel fuer die Gruppierung mehrere Layer unter "Layers" ********* ********************************************** */
/*
var layer99 = [ 
	new ol.layer.Tile({
		source: new ol.source.MapQuest({layer: 'sat'})
	}),
	new ol.layer.Tile({
		extent: [-13884991, 2870341, -7455066, 6338219],
		source: new ol.source.TileWMS({
			url: 'http://demo.boundlessgeo.com/geoserver/wms',
			params: {LAYERS: 'topp:states', TILED: true},
			serverType: 'geoserver'
		})
	}),
	//webatlas wird hier "nur" als Image eingebunden = sehr langsam, da gesamtes Bild geladen wird.
	new ol.layer.Image({
		source: new ol.source.ImageWMS({
			url: 'http://sg.geodatenzentrum.de/wms_webatlasde?',
			params: {LAYERS: 'webatlasde'},
		})
	}) 
];
*/
/* Ausgabe der einzelnen Layers **************************************************************************************** */
var map = new ol.Map({
	layers: [
		baselayer1,
		//baselayer2,
		baselayer3,
		//baselayer4,
		layer1,
                layer5,
		layer2,
		layer3,
		layer4,
	],
	//layers: layer99, //sind mehrere Layer unter "Layers" gruppiert, so kann die Ausgabe nur einzeln, nicht im Array erfolgen.
	target: 'map',
	renderer: 'canvas',
	
	/* View festlegen */
	view: new ol.View({
                //default projection is Spherical Mercator (EPSG:3857)
                projection: 'EPSG:3857',
                //projection: 'EPSG:4326',
		center: [1000000, 6960000], //EPSG:3857
                //center: [8.9831528412, 52.8754896363], //EPSG:4326
		//center: ol.proj.fromLonLat([37.41, 8.82]), //Projektion-Center nach EPSG:4326 umgerechnet.
		zoom: 7,
		rotation: 0
	})
});

//Funktion um eine zufällig UUID zu generieren
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}