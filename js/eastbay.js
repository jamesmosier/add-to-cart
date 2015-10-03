// casperjs eastbay.js --engine=slimerjs --ssl-protocol=TLSv1

//var casper = require('casper').create();
var casper = require("casper").create({
  onRunComplete: function() {
    // Don't exit on complete.
  }
});

casper.options.viewportSize = {
  width: 1200,
  height: 950
};

casper.options.waitTimeout = 999999999999999999999;

// YEEZY link
var url = 'http://www.eastbay.com/product/model:254106/sku:AQ4832/adidas-originals-yeezy-boost-350-mens/?SID=6136&cm_mmc=Social-_-Twitter-_-NewReleases-_-adidasYeezyBoost350';

//Test url
//var url = 'http://www.eastbay.com/product/model:215780/sku:34472/adidas-originals-zx-flux-mens/white/black/?cm=GLOBAL%20SEARCH%3A%20KEYWORD%20SEARCH';

var pwd = 'password1';

casper.start(url, function() {

  this.echo(this.getTitle());

  //var tileText = this.fetchText('.product_title');
  // if (tileText.indexOf('adidas Originals') > -1) {
  //   console.log('text is there');
  // } else {
  //   this.die("h1 text is not there");
  // }
});


//wait for zero!
casper.waitForText("0 hrs 0 min 0 sec", function() {
    this.echo('Found the time!');
});

casper.wait(1500, function() {
  this.echo("I've waited for 1.5 seconds.");
});

casper.then(function() {
  casper.evaluate(function() {

    console.log('inside size click');

    document.querySelector("[data-value='10.0']").click();
  });
});


casper.thenClick('#add_to_cart', function() {
  this.echo('add to bag clicked');
});

casper.wait(500, function() {
  this.echo("I've waited for .5 seconds.");
});

casper.thenClick('#push_mc_checkout_button', function() {
  this.echo('checkout clicked now REVIEW page');
});

casper.waitUntilVisible("#cart_checkout_button", function() {
    this.echo('yellow CHECKOUT button is visible.');
});

// casper.wait(1000, function() {
//   this.echo("I've waited for 1 seconds after checkout review clicked.");
// });

casper.thenClick('#cart_checkout_button', function() {
  this.echo('checkout clicked (next to PayPal btn) now onto secure page');
});

//Below this starts checkout page logic
//----------

// casper.wait(1000, function() {
//   this.echo("waiting 1 seconds to fill out login form.");
// });

casper.waitUntilVisible("#loginPane_edit", function() {
    this.echo('login pane is visible.');
});

casper.then(function() {
  this.fillSelectors('#loginPane_edit', {
    'input[name="loginPaneEmailAddress"]': 'email@gmail.com',
    'input[name="loginPanePassword"]': pwd
  }, false);
});

casper.thenClick('#loginPaneLogin', function() {
  this.echo('login clicked');
});

// casper.wait(1500, function() {
//   this.echo("waiting 1.5 seconds to fill out CVV field.");
// });

casper.waitUntilVisible("#orderReviewPane_edit", function() {
    this.echo('CVV panel is visible.');
});

casper.then(function() {
  this.fill('#orderReviewPane_edit', {
    'payMethodPaneStoredCCCVV': '123'
  }, false);
});

//console.warn('CVV should be filled out');

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
