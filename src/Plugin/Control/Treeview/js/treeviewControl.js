(function($)
{
    ol.control.treeviewControl = function(opt_options, ol3_map)
    {
        var options = opt_options || {};
        var tipLabel = 'LayerTree';

        this.mapListeners = [];

        this.hiddenClassName = 'ol-unselectable ol-control layer-switcher';
        this.shownClassName = this.hiddenClassName + ' shown';

        var element = document.createElement('div');
        element.className = this.hiddenClassName;

        var button = document.createElement('button');
        button.setAttribute('title', tipLabel);
        element.appendChild(button);

        this.panel = document.createElement('div');
        this.panel.className = 'panel';
        element.appendChild(this.panel);

        var this_ = this;
        //var layers = this.getMap().getLayers();
        //layers.forEach(function(layer){console.log(layer.getProperties())});
        var layertree = [];
        layertree = bildlayertree(ol3_map.getLayers());
        console.log('layertree:  '+layertree);
        var layertree_shown = false;
        button.onclick = function(e) 
        {
            e.preventDefault();  
            if(layertree_shown === false)
            {
                //console.log(ol3_map.getLayers().getProperties());
                //console.log(this_.getMap().getLayers().getProperties());
                //this_.showPanel();
                layertree_shown = true;
            } 
            else
            {
                layertree_shown = false;
                //this_.hidePanel();
            }
        };
        ol.control.Control.call(this, 
        {
            element: element,
            target: options.target
        });
    };
    ol.inherits(ol.control.treeviewControl, ol.control.Control);

    function bildlayertree()
    {
        //console.log('map:  '+ol3_map);

        var id = $('.openlayers-map').attr('id');
        var map = Drupal.openlayers.getMapById(id);
        console.log(map.map);
        console.log(map.map.getLayers());
        //var layers =  map.getLayers();
        var layers = map.map.getLayers();
        //console.log('layers: '+layers);
        var data = [];
        var group = [];
        layers.forEach(function(layer) 
        {
            console.log('Layer:'+layer.getProperties());
            console.debug('Layer_Debug:'+layer.getProperties())
//            console.log('Base '+layer.get('base'));
//            console.log('Group '+layer.get('group'));
//            console.log('Title '+layer.get('title'));
//            console.log('Name '+layer.get('name'));
//            console.log('Uid '+layer.get('uid'));
              console.log('huhu');

            if((layer.get('base') == false) && (isInArray(layer.get('group'),group) == false))
            {
                group.push(layer.get('group'));
            }
        });
        group.forEach(function(gr)
        {
            var grdata = {
                text: gr,
                val:gr,
                selectable:false,
                state:
                        {
                            checked:false,
                        },
                nodes:[]
            };

                var start_checked = 0;
                layers.forEach(function(layer)
                {

                        if(layer.get('group') == gr)
                        {
                                var layerdata = [];
                                if(layer.getVisible())
                                {
                                        start_checked++;
                                        layerdata ={
                                                text: layer.get('title'),
                                                val:layer.get('name'),
                                                selectable:false,
                                                uid: layer.get('uid'),
                                                state:
                                                {
                                                    checked:true,
                                                    opacity: layer.getOpacity(),
                                                }
                                        };
                                }
                                else
                                {
                                        layerdata ={
                                                text: layer.get('title'),
                                                val:layer.get('name'),
                                                selectable:false,
                                                uid: layer.get('uid'),
                                                state:{
                                                    checked: false,
                                                    opacity: layer.getOpacity(),
                                                }
                                        };
                                }
                                grdata.nodes.push(layerdata);
                        };
                });
                if(start_checked > 0)
                {
                        grdata.state.checked=true;
                };
                data.push(grdata);
        });
        return data;
    };
    
    
})(jQuery);