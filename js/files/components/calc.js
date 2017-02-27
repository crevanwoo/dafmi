

function PlusMinusControls(selector) {

    this.addListeners = function (events) {
        $('body').on(events, selector, function (e) {
            makeAction.call(e.target)
        })
    };

    this.controlDecrease = 'minus';

    this.controlIncrease = 'plus';

    this.amount = ".num span";

    this.wrapper = "amount";

    this.productParent = 'single_product';

    this.productPrice = '.price span';

    this.productSumm = '.summ span';

    this.totalSumm = '.page_cart .total span';
    
    this.globalWrapper = '.page_cart';

    var Current = this;

    function changeAmount(boolean) {
        var parent = findParent($(this), Current.wrapper);
        var current_amount = +$(parent).find(Current.amount).text();

        if (boolean) {
            setAmount(++current_amount, parent)
        } else {
            setAmount(--current_amount, parent)
        }
        var ProductParent = findParent($(this), Current.productParent);
        
        checkSumm.call(ProductParent);
        Current.checkTotalSumm.call($(Current.globalWrapper + ' .' + Current.productParent));
    };

    function setAmount(num, parent) {
        if (num < 1) {
            num = 1
        };
        parent.find(Current.amount).text(num);
    };

    function makeAction() {
        if ($(this).hasClass(Current.controlDecrease)) {
            changeAmount.call(this, false)

        } else if ($(this).hasClass(Current.controlIncrease)) {
            changeAmount.call(this, true)
        }
    };


    function checkSumm() { //this = single_product_self
        var price = +$(this).find(Current.productPrice).text();
        var amount = +$(this).find('.' + Current.wrapper + ' ' + Current.amount).text();
        $(this).find(Current.productSumm).html(Math.round(price * amount));
    }

    this.checkTotalSumm = function () { //this = single_product_self
        
        var summ = 0;
        $(this).each(function () {
            summ += +$(this).find(Current.productSumm).text();
        })

        $(Current.totalSumm).html(summ);
    }
}