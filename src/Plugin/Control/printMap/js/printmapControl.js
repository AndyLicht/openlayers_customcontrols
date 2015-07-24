var printMapControl = function(opt_options) {
    var options = opt_options || {};

    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Print';

    var this_ = this;
    var alertmytext = function(e) {
	alert('Print');
    };

    button.addEventListener('click', alertmytext, false);
    button.addEventListener('touchstart', alertmytext, false);

    var element = document.createElement('div');
    element.className = 'print-button ol-unselectable ol-control';
    element.appendChild(button);

    ol.control.Control.call(this, {
	element: element,
	target: options.target
    });
};
ol.inherits(printMapControl, ol.control.Control);
