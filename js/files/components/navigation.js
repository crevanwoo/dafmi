function Navigation(selector) {

    this.transition_time = 0;

    this.changing_properties = {};
    /* события вводить без запятых, через пробелы*/
    this.addListeners = function (events, inner_selector) {
        $('body').on(events, selector, function (e) {
            makeAction.call(e.target, inner_selector)
        })
    };


    var Current = this; //current oject

    var clicked_style;

    var style_array;


    function activateElement(inner_selector) {
        var obj = $(this).find(inner_selector); // clicked object
        clicked_style = obj.attr('style');
        try {
            style_array = clicked_style.split(';');
        } catch (err) {
            console.log(err);
            style_array = null;
        }
        $.each(Current.changing_properties, function (key, value) {
            obj.css(key, value)
        });

        bustDefaultStyleArray(obj);

        obj.css('transition', Current.transition_time + 'ms');
        setTimeout(function () {
            obj.addClass('active');
        }, 100);
    };

    function deactivateElement(inner_selector) {
        var obj = $(this).find(inner_selector);
        obj.removeClass('active');
        setTimeout(function () {
            bustDefaultStyleArray(obj);
        }, Current.transition_time)
    };

    function bustDefaultStyleArray(obj) {
        try {
            for (var k = 0; k < style_array.length; k++) {
                var current_property = style_array[k].split(':');
                obj.css(current_property[0], [1]);
            }
        } catch (err) {
            console.log(err);
            return
        }

    }

    function makeAction(inner_selector) {
        if ($(this).find(inner_selector).hasClass('active')) {
            return deactivateElement.call(this, inner_selector)

        } else {
            return activateElement.call(this, inner_selector)
        }
    };
}


/*function Navigation(selector) {
    
    this.transition_time = 0;
    
    this.changing_properties = {};
    
    this.addListeners = function (events) {
        for (var i = 0; i < elems_array.length; i++) {
            for (var j = 0; j < arguments.length; j++) {
                elems_array[i].addEventListener(arguments[j], makeAction())
            }
        }
    };

    var Current = this; //current oject
    
    var clicked_style;
    
    var elems_array = document.querySelectorAll(selector);
    
    function activateElement() {
        var obj = this; // clicked object
        clicked_style = obj.style;
        obj.style = JSON.stringify(Current.changing_properties) + clicked_style;
        obj.style.transition = transition_time + 'ms';
        setTimeout(function () {
            obj.classList.add('active')
        }, 100);
    };

    function deactivateElement() {
        var obj = this;
        obj.classList.remove('active');
        setTimeout(function () {
            obj.style = clicked_style;
        }, transition_time)
    };

    function makeAction() {
        if (this.classList.contains('active')) {
            return deactivateElement

        } else {
            return activateElement
        }
    };

    



}

Obj.changing_properties = {

}

var small_cart = new Navigation(.header_bottom.min .cart); //single selector*/