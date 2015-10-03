// Test script, used with local webpage (not included, not sure where it went...)

var casper = require('casper').create({
    clientScripts: ["jquery.js"]
});

casper.options.viewportSize = {width: 1600, height: 950};

casper.start('http://localhost:3000/', function() {

    this.echo(this.getTitle());

    var tileText = this.fetchText('.productname h1');

    if (tileText.indexOf('Adidas Busenitz') > -1) {
        console.log('text is there');
    } else {
        console.log('text is not there');
        this.die("h1 text is not there");
    }
});



casper.then(function() {
    this.evaluate(function(){
        var $foo = $('.swatchesdisplay').find('.swatchanchor');

        $foo.filter(function(){
            return $(this).text() === '10    SIZE';
        }).parent().addClass('selected');

         //foo.addClass('selected');
        console.log('size clicked');
    });
    // console.log('size clicked');
    // this.clickLabel('10    SIZE', '.swatchanchor');
});

casper.waitForSelector('.emptyswatch.activated', function(){
    console.log('btn is clicked!');
});

// casper.then(function() {
//     console.log('add to bag clicked');
//     this.clickLabel('Add to Bag', '.addtocartbutton');
// });

// casper.waitFor(function check() {
//     return this.evaluate(function() {

//         var cartNumDiv = document.getElementsByClassName('.linkminicart');
//         return cartNumDiv[0].innerHTML.indexOf('1') != -1;
//         //return document.querySelectorAll('ul.your-list li').length > 2;
//     });
// }, function then() {
//     console.log('clicking process to checkout!')
//     this.clickLabel('Proceed To Checkout', '.proceedcheckoutlink span');
// });


casper.then(function() {
    this.wait(100000, function() {
        this.echo("I've waited for 100 second.");
    });
});

casper.run();