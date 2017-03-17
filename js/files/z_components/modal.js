function ModalWindow(modal_selector) {

    CollectFormData.call(this, modal_selector);
	
	
    var m_window = $(modal_selector);

    this.transition_time = 300;

    this.preventScroll = true;

    this.windowOpen = function (trigger) {
        $('body').on('click', trigger, function (e) {
            Current.activateElement();
        })
    };

    this.windowClose = function (trigger) {
        $('body').on('click', trigger, function (e) {
            Current.deactivateElement(); 
        })
    };

    this.activateElement = function () {
        controlScroll();
        clicked_style = m_window.attr('style');
        try {
            style_array = clicked_style.split(';');
        } catch (err) {
            console.log(err);
            style_array = null;
        }

        m_window.css('display', 'block');


        bustDefaultStyleArray(window);

        m_window.css('transition', Current.transition_time + 'ms');
        setTimeout(function () {
            m_window.addClass('active');
        }, 100);
    };

    var Current = this; //current oject

    var clicked_style;

    var style_array;

    this.deactivateElement = function () {
        releaseScroll();
        m_window.removeClass('active');
        setTimeout(function () {
            bustDefaultStyleArray(m_window);
        }, Current.transition_time)
    };

    function bustDefaultStyleArray(selector) {
        try {
            selector.attr('style', '');
            for (var k = 0; k < style_array.length; k++) {
                var current_property = style_array[k].split(':');
                selector.css(current_property[0], [1]);
            }
        } catch (err) {
            console.log(err);
            return
        }
    }

    function controlScroll() { //open window
        if (Current.preventScroll) {
            $('body').on('wheel keydown touchstart touchmove', preventScrolling)
        }
    }

    function preventScrolling(e) {
        if (e.type == 'keydown') {
            if (e.keyCode == "40" || e.keyCode == "38") {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        } else if (e.type == 'wheel') {
            e.preventDefault();
            e.stopImmediatePropagation();
        } else {

            if (e.type == 'touchstart') {
                this.firstCoord = this.getTouchCoord(e);
            } else if (e.type == 'touchmove') {
                this.lastCoord = this.getTouchCoord(e);
            } else if (e.type == 'touchend') {
                if (this.lastCoord - this.firstCoord > 10) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                } else if (this.lastCoord - this.firstCoord < -10) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }

            }
        }

    }

    function releaseScroll() { //close window
        $('body').off('wheel keydown touchstart touchmove', preventScrolling)
    }
}
