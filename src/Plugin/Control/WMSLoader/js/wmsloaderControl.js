var wmsloaderControl = function(opt_options,ol3_map) {
    var options = opt_options || {};
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'WMS';
    var this_ = this;

    button.addEventListener('click', startwmsgui, false);
    button.addEventListener('touchstart', startwmsgui, false);

    var element = document.createElement('div');
    element.className = 'wms-button ol-unselectable ol-control';
    element.appendChild(button);

    ol.control.Control.call(this, {
	element: element,
	target: options.target
    });
    jQuery('body').on('click','#closeoverlay',function()
    {
	jQuery(this).parent().parent().remove();
    });

    jQuery('body').on('click','#loadcapa',function()
    {
	//var path = Drupal.settings;
	//console.log(path);
	jQuery.ajax({
	    type:'POST',
	    url: '/php/proxyparser.php',   //that would be great it this is not in the base directory
	    data: {'wmsurl':jQuery('#wmsgetcapabilitiesurl').val()},
	context: document.body
    })
    .done(function(response)
    {
	jQuery('#capa').html(response);
    })
    .fail(function(){console.log('fail')})
    jQuery('body').on('click','#loadwms',function()
    {
	var serviceurl = jQuery('#wmsgetcapabilitiesurl').val();
	var format = jQuery('input[name=imageformat]:checked').val();
//	var map = Drupal.openlayers.getMapById(jQuery('.openlayers-map')[0].id).map;
	jQuery('input[name=servicelayer]').each(function()
	{
	    if(jQuery(this).is(':checked'))
	    {
		//Layer hinzufügen
		layer = addmyLayer(1, jQuery(this).attr('layername'),jQuery(this).parent().text(),serviceurl);
		ol3_map.addLayer(layer);
	    }
	    else
	    {
		layer = addmyLayer(0, jQuery(this).attr('layername'),jQuery(this).parent().text(),serviceurl);
		ol3_map.addLayer(layer);
	    };
	});
    });
});



};
ol.inherits(wmsloaderControl, ol.control.Control);


var startwmsgui = function(e) {
    var guioverlay = '<div id="wmsloaderoverlay"><div class="wmsoverlaydiv"><p>For Example use:http://www.bgr.de/service/bodenkunde/boart1000_ob/v2.0/index.php?service=wms&version=1.1.1&request=GetCapabilities</p><div id="capa"></div><input id="wmsgetcapabilitiesurl" type="text" value=""></input><button type="button" id="loadcapa">loadCapa</button><button type="button" id="loadwms">loadWMS</button><button type="button" id="closeoverlay">Close</button></div></div>';
    jQuery('body').append(guioverlay);
  };

function addmyLayer(status, layername, layertitle, serviceurl)
{
    var layer = new ol.layer.Tile(
    {
	source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ (
	{
	    url: serviceurl,
	    params: {'LAYERS': layername}
	}))
    });
    layer.set('name',layername);
    layer.set('title',layertitle);
    layer.set('base',false);
    if(status == 0)
    {
	layer.setVisible(false);
    };
    if(status == 1)
    {
	layer.setVisible(true);
    }
    return layer;
};