const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "./assets": "" });

  // Filtros

  // Optimiza css https://github.com/jakubpawlowicz/clean-css
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
