const CleanCSS = require("clean-css");
const { PurgeCSS } = require('purgecss');

module.exports = function (eleventyConfig) {
  console.log(process.env.ELEVENTY_ENV);

  eleventyConfig.addPassthroughCopy({ "./assets": "" });

  /* Filters */

  // Optimiza css https://github.com/jakubpawlowicz/clean-css
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  /* Transforms */
  /**
   * Remove any CSS not used on the page and inline the remaining CSS in the
   * <head>.
   *
   * @see {@link https://github.com/FullHuman/purgecss}
   */
  eleventyConfig.addTransform('purge-and-inline-css', async (content, outputPath) => {
    if (process.env.ELEVENTY_ENV !== 'prod' || !outputPath.endsWith('.html')) {
      return content;
    }

    const purgeCSSResults = await new PurgeCSS().purge({
      content: [{ raw: content }],
      css: ['./assets/css/style.css'],
      keyframes: true,
    });

    return content.replace('<!-- INLINE CSS-->', '<style>' + purgeCSSResults[0].css + '</style>');
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
