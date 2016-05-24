/* global ol */
(function($)
{
    ol.control.treeviewControl = function(opt_options, ol3_map)
    {
        var options = opt_options || {};
        var this_ = this;
        var tipLabel = 'LayerTree';
        var layertree = this_.bildlayertree(ol3_map);
        
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
        
        var dialog = document.createElement('div');
        dialog.id = 'legendendialog';
        document.body.appendChild(dialog);
        
        window.onload = function ()
        {
            $('#treeview').treeview({data: layertree,showCheckbox:true,showOpacity:true,showDeleteIcon:true,showXmlIcon:true,showExtentIcon:true,showLegendIcon:true,olMap:ol3_map});
        }
       
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
        if (this.element.className !== this.shownClassName) 
        {
            this.element.className = this.shownClassName;
        }
    };
    ol.control.treeviewControl.prototype.hidePanel = function() 
    {
        if (this.element.className !== this.hiddenClassName) 
        {
            this.element.className = this.hiddenClassName;
        }
    };

    ol.control.treeviewControl.prototype.isInArray = function(value, array) 
    {
        return array.indexOf(value) > -1;
    };
//    function isInArray (value, array) 
//    {
//        return array.indexOf(value) > -1;
//    };
//    
    ol.control.treeviewControl.prototype.bildlayertree = function (map)
    {
        var layers =  map.getLayers();
        var data = [];
        var group = [];
        layers.forEach(function(layer) 
        {
            if((layer.get('base') === false) && (ol.control.treeviewControl.prototype.isInArray(layer.get('tree_group'),group) === false))
            {
                group.push(layer.get('tree_group'));
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
                            checked:false
                        },
                nodes:[]
            };

                var start_checked = 0;
                layers.forEach(function(layer)
                {
                    if(layer.get('tree_group') === gr)
                    {
                        var layerdata = [];
                        if(layer.getVisible())
                        {
                            start_checked++;
                            layerdata ={
                                text: layer.get('tree_title'),
                                val:layer.get('tree_name'),
                                selectable:false,
                                uid: layer.get('tree_uid'),
                                state:
                                {
                                    checked:true,
                                    opacity: layer.getOpacity()
                                }
                            };
                        }
                        else
                        {
                            layerdata ={
                                text: layer.get('tree_title'),
                                val:layer.get('tree_name'),
                                selectable:false,
                                uid: layer.get('tree_uid'),
                                state:{
                                    checked: false,
                                    opacity: layer.getOpacity()
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


ol.Map.addListener = function()
{
    console.log('yeah');
};