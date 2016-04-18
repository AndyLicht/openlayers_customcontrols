(function($)
{
    ol.control.pdfexportControl = function(opt_options, ol3_map)
    {
        var options = opt_options || {};
        
        var dims = 
        {
            a0: [1189, 841],
            a1: [841, 594],
            a2: [594, 420],
            a3: [420, 297],
            a4: [297, 210],
            a5: [210, 148]
        };
        
        var resolution = 
        {
            dpi72:72,
            dpi150:150,
            dpi300:300
        }

        var button = document.createElement('button');
        button.type = 'button';
        button.id = 'button-label'
        button.innerHTML = 'PDF';

        var element = document.createElement('div');
        element.className = 'ol-unselectable ol-control ol-control-pdfexport';
        element.appendChild(button);
        
        button.addEventListener('click', function() 
        {
            button.disabled = true;
            document.body.style.cursor = 'progress';
        },false);
        
        ol.control.Control.call(this, 
        {
            element: element,
            target: options.target
        });
    };
})(jQuery);

ol.inherits( ol.control.pdfexportControl, ol.control.Control);