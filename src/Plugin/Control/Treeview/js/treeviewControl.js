(function($)
{
    ol.control.treeviewControl = function(opt_options, ol3_map)
    {
        var options = opt_options || {};
        var tipLabel = 'LayerTree';
        var layertree = bildlayertree(ol3_map);
        console.log(layertree);
        
        this.hiddenClassName = 'ol-unselectable ol-control layer-layertree';
        this.shownClassName = this.hiddenClassName + ' shown';

        var element = document.createElement('div');
        element.className = this.hiddenClassName;

        var button = document.createElement('button');
        button.setAttribute('title', tipLabel);
        element.appendChild(button);

        this.panel = document.createElement('div');
        this.panel.className = 'panel';
        this.panel.id = 'treeview';
        element.appendChild(this.panel);
        
        $('#treeview').treeview({data:layertree});
        console.log(this);

        
        var this_ = this;
        var layertree_shown = false;
        button.onclick = function(e) 
        {
            e.preventDefault();
            
            if(layertree_shown === false)
            {
                this_.showPanel();
                layertree_shown = true;
            } 
            else
            {
                layertree_shown = false;
                this_.hidePanel();
            }
        };
        ol.control.Control.call(this, 
        {
            element: element,
            target: options.target
        });
    };
    ol.inherits(ol.control.treeviewControl, ol.control.Control);

    ol.control.treeviewControl.prototype.showPanel = function() 
    {
        if (this.element.className != this.shownClassName) 
        {
            this.element.className = this.shownClassName;
            //this.renderPanel();
        }
    };
    ol.control.treeviewControl.prototype.hidePanel = function() 
    {
        if (this.element.className != this.hiddenClassName) 
        {
            this.element.className = this.hiddenClassName;
        }
    };

    function isInArray(value, array) 
    {
        return array.indexOf(value) > -1;
    }
    
    
    
    
    function bildlayertree(map)
    {
        console.log('im Klickevent');
        var layers =  map.getLayers();
        var data = [];
        var group = [];
        layers.forEach(function(layer) 
        {
            if((layer.get('base') === false) && (isInArray(layer.get('group'),group) === false))
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
        console.log(data);
        return data;
    };  
    
})(jQuery);