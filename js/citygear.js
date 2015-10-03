// casperjs citygear.js --engine=slimerjs --ssl-protocol=TLSv1

//    http://www.citygear.com/yeezy-118345-9674-420index-boost.html

var casper = require("casper").create({
  onRunComplete: function() {
    // Don't exit on complete.
  }
});

casper.options.viewportSize = {
  width: 1600,
  height: 950
};

casper.options.waitTimeout = 999999;

//YEEZY
//var url = 'http://www.finishline.com/store/catalog/product.jsp?&productId=prod789891&utm_medium=affiliate&utm_source=linkshare&utm_campaign=program_level&siteID=je6NUbpObpQ-FLnKKUooqb6RBHzob5pOgg';

//test url
var url = 'http://www.finishline.com/store/catalog/product.jsp?productId=prod763735';

var pwd = 'password1';

casper.start(url, function() {

  this.echo(this.getTitle());

});


casper.then(function() {
  casper.evaluate(function() {

    console.log('inside size click');
    //this.clickLabel('10.0', '.size');
    //document.querySelector("[data-modelsize='10_0']").click();
    var aTags = document.getElementsByClassName("size");
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

// casper.wait(1000, function() {
//   this.echo("I've waited for 1 seconds.");
// });

casper.thenClick('#buttonAddToCart', function() {
  this.echo('add to cart clicked');
});

// casper.wait(1000, function() {
//   this.echo("I've waited for 1 seconds.");
// });

casper.waitUntilVisible(".ui-dialog.ui-widget.ui-widget-content.ui-corner-all.global-modal.ui-draggable.ui-resizable", function() {
  casper.run();
});

casper.thenClick('#addToCartModalContent .shoppingInfo .btn', function() {
  this.echo('view full cart');
});

// casper.wait(1000, function() {
//   this.echo("I've waited for 1 seconds after checkout review clicked.");
// });

casper.thenClick('#checkoutButtonTop > .btn-primary.leftArrow', function() {
  this.echo('cart checkout ... now onto secure page');
});

//Below this starts checkout page logic
//----------
//
// casper.wait(1000, function() {
//   this.echo("waiting 1 seconds to fill out login form.");
// });

casper.then(function() {
  this.fillSelectors('#loginForm', {
    'input[name="email"]': 'email@gmail.com',
    'input[name="password"]': pwd
  }, false);
});

//clicks hidden button
//otherwise, click real btn by doing .buttonSection .btn-primary.leftArrow
casper.thenClick('.buttonSection .btn-primary.leftArrow', function() {
  this.echo('login clicked');
});

// casper.wait(500, function() {
//   this.echo("waiting .5 seconds to check the copy address checkbox.");
// });


casper.waitUntilVisible(".deliveryleftSection", function() {
  this.echo('delivery section is visible.');
});

casper.then(function() {
  this.fillSelectors('.billingCheckBox.typeCheckBox', {
    'input[name="copyNewAddrToBilling"]': true,
  }, false);
});

casper.thenClick('#shippingContinue', function() {
  this.echo('continue to billing');
});

casper.then(function() {
  this.fillSelectors('#billing_credit_card', {
    'input[name="creditCardNumberTemp"]': '1234567891234567',
    'input[name="securityCodeTemp"]': '123'
  }, false);
});


// casper.wait(1000, function() {
//   this.echo("waiting 1 seconds to fill out month field.");
// });

// 'input[name="expirationMonthTemp"]': '08',
// 'input[name="expirationYearTemp"]': '2015',

casper.then(function() {
  casper.evaluate(function() {
    console.log('inside thenEval for month select');

    document.getElementById('expirationMonthTemp').value = "08";

  });
});

casper.then(function() {
  casper.evaluate(function() {
    console.log('inside thenEval for month select');

    document.getElementById('expirationYearTemp').value = "2015";

  });
});

casper.then(function() {
  this.evaluate(function() {
    window.scrollTo(0, document.body.scrollHeight);
  });
});

// casper.thenEvaluate(function(){
//         console.log('inside thenEval for month select');
//         console.log($('#expirationMonthTemp'));
//         var $select = $('#expirationMonthTemp');
//         var _option = '08';
//         $select.val(_option);
//         $select.change();
//
// });

casper.thenClick('#js-review-order', function() {
  this.echo("review order btn clicked");
});


casper.then(function() {
  this.wait(10000000, function() {
    this.echo("I've waited for 10000 second.");
  });
});

casper.run();
