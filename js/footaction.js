// casperjs footaction.js --engine=slimerjs --ssl-protocol=TLSv1

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

casper.options.waitTimeout = 9999999999;

//YEEZY
var url = 'http://www.footaction.com/product/model:254106/sku:AQ4832/adidas-originals-yeezy-boost-350/?SID=7040&cm_mmc=Social-_-twitter-_-yeezy-_-blackwhite';

//test url
//var url = 'http://www.footaction.com/product/model:242054/sku:25231176/nike-zoom-cj-trainer-3-mens/calvin-johnson/detroit-lions/#sku=25231176&size=10.0';

var pwd = 'password1';

casper.start(url, function() {
  this.echo(this.getTitle());
});

//WAIT for time to be ZERO
// casper.waitForText("0 hours 0 min 0 sec", function() {
//     this.echo('Found the time!');
// });

// casper.wait(1500, function() {
//   this.echo("I've waited for 1.5 seconds.");
// });

casper.then(function() {
  casper.evaluate(function() {

    console.log('inside size click');
    var aTags = document.getElementsByClassName("available");
    var searchText = "10.0";
    var found;

    for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].textContent == searchText) {
        found = aTags[i];
        break;
      }
    }

    found.click();
  });

});

casper.wait(750, function() {
  this.echo("I've waited for .75 seconds.");
});

casper.thenClick('#addToCartLink', function() {
  this.echo('add to cart clicked');
});

casper.wait(750, function() {
  this.echo("I've waited for .75 seconds.");
});


casper.thenClick('[data-btnname="minicart_viewFullCart"]', function() {
  this.echo('view full cart');
});

// casper.wait(1000, function() {
//   this.echo("I've waited for 1 seconds after checkout review clicked.");
// });

casper.waitUntilVisible('[data-btnname="cart_checkout"]', function() {
  this.echo('cart checkout btn is visible.');
});

casper.thenClick('[data-btnname="cart_checkout"]', function() {
  this.echo('cart checkout ... now onto secure page');
});

//Below this starts checkout page logic
//----------

casper.wait(1000, function() {
  this.echo("waiting 1 seconds to fill out login form.");
});

// casper.thenClick('#loginPaneEmailAddress', function(){
//   this.echo('checkout page is visible');
// });

casper.then(function() {
  this.fillSelectors('#loginPane_edit', {
    'input[name="loginPaneEmailAddress"]': 'email@gmail.com',
    'input[name="loginPanePassword"]': pwd
  }, false);
});

//clicks hidden button
//otherwise, click real btn by doing .buttonSection .btn-primary.leftArrow
casper.thenClick('#loginPaneLogin', function() {
  this.echo('login clicked');
});

// casper.wait(1500, function() {
//   this.echo("waiting 1.5 seconds to fill out CVV.");
// });

casper.waitUntilVisible("#orderReviewPane_edit", function() {
  this.echo('CVV panel is visible.');
});

casper.then(function() {
  this.fill('#orderReviewPane_edit', {
    'payMethodPaneStoredCCCVV': '123'
  }, false);
});


casper.then(function() {
  this.wait(10000000, function() {
    this.echo("I've waited for 10000 second.");
  });
});

casper.run();
