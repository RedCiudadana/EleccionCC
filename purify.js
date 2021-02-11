var purify = require('purify-css');

var content = ['./src/*.njk'];
var css = ['./_site/assets/css/style.css'];

var options = {
    output: './_site/assets/css/style.css',

    // Will minify CSS code in addition to purify.
    minify: true,

    // Logs out removed selectors.
    rejected: false
};

purify(content, css, options);