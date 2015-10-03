// casperjs footlocker.js --engine=slimerjs --ssl-protocol=TLSv1

var casper = require("casper").create({
  onRunComplete: function() {
    // Don't exit on complete.
  }
});

casper.options.viewportSize = {width: 1600, height: 950};

var url = 'http://www.footlocker.com/product/model:243138/sku:33704/adidas-pure-boost-2-mens/black/white/?cm=GLOBAL%20SEARCH%3A%20KEYWORD%20SEARCH';

var pwd = 'password1';

casper.start(url, function() {

    this.echo(this.getTitle());

    var tileText = this.fetchText('[data-info="product_title"]');

    if (tileText.indexOf('adidas Pure Boost') > -1) {
        console.log('text is there');
    } else {
        console.log('text is not there');
        this.die("h1 text is not there");
    }
});


// casper.then(function() {
//     casper.evaluate(function(){

//         console.log('inside size click');

//         // var eid = document.getElementById('product_sizes');
//         // for (var i = 0; i < eid.options.length; ++i) {
//         //     if (eid.options[i].text === '10.0')
//         //         eid.options[i].selected = true;
//         // }

//         document.getElementById('product_sizes').selectedIndex = 2; //it is obvious
//         return true;

//          //var selectbox = document.getElementById("product_sizes");
//          //selectbox.options[selectbox.options.selectedIndex].selected = true;

//         //document.querySelector("[data-modelsize='10_0']").click();
//     });

// });


casper.then(function(){
    this.fillSelectors('#product_sizes', {
        "[data-modelsize='10_0']": '10.0'
    }, false);
});

casper.wait(1000, function() {
    this.echo("I've waited for 1 seconds.");
});

casper.thenClick('.size_selected', function() {
    this.echo('size selected');
});

casper.wait(1000, function() {
    this.echo("I've waited for 1 seconds.");
});

casper.thenClick('.add_to_cart > .active_step', function() {
    this.echo('add to cart clicked');
});

casper.wait(1000, function() {
    this.echo("I've waited for 1 seconds.");
});

// casper.waitForUrl('http://www.eastbay.com/shoppingcart/', function() {
//     this.echo('redirected to shoppingcart');
// });

casper.thenClick('[data-btnname="minicart_viewFullCart"]', function(){
    this.echo('view full cart');
});

casper.wait(1000, function() {
    this.echo("I've waited for 1 seconds after checkout review clicked.");
});

casper.thenClick('[data-btnname="cart_checkout"]', function(){
    this.echo('cart checkout ... now onto secure page');
});

//Below this starts checkout page logic
//----------

casper.wait(1000, function() {
    this.echo("waiting 1 seconds to fill out login form.");
});

casper.then(function(){
    this.fillSelectors('#loginPane_edit', {
        'input[name="loginPaneEmailAddress"]':      'email@gmail.com',
        'input[name="loginPanePassword"]':          pwd
    }, false);
});

casper.thenClick('#loginPaneLogin', function(){
    this.echo('login clicked');
});

casper.wait(2500, function() {
    this.echo("waiting 2.5 seconds to fill out CVV field.");
});

casper.then(function(){
    this.fill('#orderReviewPane_edit', {
        'payMethodPaneStoredCCCVV':      '123'
    }, false);
});

console.warn('CVV should be filled out');

// casper.wait(700, function() {
//     this.echo("waiting .7 seconds to click SUBMIT btn.");
// });

// casper.thenClick('#orderSubmit', function(){
//     this.echo('order SUBMIT clicked');
// });

casper.then(function() {
    this.wait(10000000, function() {
        this.echo("I've waited for 10000 second.");
    });
});

casper.run();
