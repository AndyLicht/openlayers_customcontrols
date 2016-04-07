var alertControl = function(opt_options) {
    console.log('Hustensaft');
    var options = opt_options || {};

    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Alert';

    var this_ = this;
    var alertmytext = function(e) {
	alert('now it works');
    };

    button.addEventListener('click', alertmytext, false);
    button.addEventListener('touchstart', alertmytext, false);

    var element = document.createElement('div');
    element.className = 'alert-button ol-unselectable ol-control';
    element.appendChild(button);

    ol.control.Control.call(this, {
	element: element,
	target: options.target
    });
};
ol.inherits(alertControl, ol.control.Control);
