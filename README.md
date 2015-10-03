# Add to Cart

JavaScript based "add to cart" script using headless automated testing via [CasperJS](http://casperjs.org/).

### What does it do?

There are various JavaScript files, named with what site they work for. Originally this project was meant to try to purchase the adidas Yeezy 350 Boost shoe. Needless to say, once all the sites went down on launch day, my script was useless. In essence, the tests that run simply click the buttons throughout the checkout process, select sizes, and login.

It is a very rough concept and was thrown together somewhat hastely, in order to finish before launch day. With that in mind, I hope to do a major refactor to it in the near future... :pray:

### How to run it?

Better instructions to come, but a rough outline...

* Install [CasperJS](http://casperjs.org/) globally.
* Change directory into the JS folder and run: `casperjs nameOfFile.js --engine=slimerjs --ssl-protocol=TLSv1`