var wmsloaderControl = function(opt_options,ol3_map) {
    var options = opt_options || {};
    var button = document.createElement('button');
	var serviceurl = '';
    button.type = 'button';
    button.innerHTML = 'WMS';
    var this_ = this;
	var spinner = '<p id="spinner">Please wait while we do what we do best.</p>';
	
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
		jQuery('#wmsloaderoverlay').remove();
    });

    jQuery('body').on('click','#loadcapa',function()
    {
		//var path = Drupal.settings;
		//console.log(path);
		jQuery.ajax(
		{
			type:'POST',
			url: '/php/proxyparser.php',   //that would be great it this is not in the base directory
			data: {'wmsurl':jQuery('#wmsgetcapabilitiesurl').val()},
			context: document.body,
			beforeSend:function()
			{
				serviceurl = jQuery('#wmsgetcapabilitiesurl').val();
				jQuery('#wmsoverlaydiv').html(spinner);
				jQuery('#wiz_wmsloader_01').removeClass('current');
				jQuery('#wiz_wmsloader_02').addClass('current');
			}
		})
		.done(function(response)
		{
			jQuery('#wmsoverlaydiv').html(response);
			jQuery('#wiz_wmsloader_02').removeClass('current');
			jQuery('#wiz_wmsloader_03').addClass('current');
		})
		.fail(function(){console.log('fail')})
		
		jQuery('body').on('click','#loadwms',function()
		{
			var format = jQuery('input[name=imageformat]:checked').val();
			//var map = Drupal.openlayers.getMapById(jQuery('.openlayers-map')[0].id).map;
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
			//close Overlay
			jQuery('#wmsloaderoverlay').remove();
		});
	});
};
ol.inherits(wmsloaderControl, ol.control.Control);


var startwmsgui = function(e) 
{
    var wiz_one = '<div id="wmsloaderoverlay"><div class="overlaycontent"><div class="wizard"><a id="wiz_wmsloader_01" class="current"><span class="badge badge-inverse">1</span>				Capabilities URL eingeben</a><a id="wiz_wmsloader_02"><span class="badge badge-inverse">2</span>Capabilities URL laden</a><a id="wiz_wmsloader_03"><span class="badge">3</span>WMS laden</a></div><div id="wmsoverlaydiv"><p>For Example use:http://maps.testbed.gdi-de.org/geoserver/wmstest/wms?service=wms&version=1.1.1&request=GetCapabilities</p><input id="wmsgetcapabilitiesurl" type="text" value=""></input><button type="button" id="loadcapa">loadCapa</button><button type="button" id="closeoverlay">Close</button></div></div></div>';
    jQuery('body').append(wiz_one);
};

function addmyLayer(status, layername, layertitle, serviceurl)
{
	console.log(layername);
	console.log(layertitle);
	console.log(serviceurl);
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
		console.log('aus');
		layer.setVisible(false);
    };
    if(status == 1)
    {
		console.log('an');
		layer.setVisible(true);
    }
    return layer;
};