module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-flexbugs-fixes': {},
    'postcss-property-lookup': {},
    'postcss-short': {
      skip: 'null'
    },
    cssnano: {},
    'postcss-sort-media-queries': {},
    '@fullhuman/postcss-purgecss': {
      content: [`./build/*.html`, `./dist/*.html`],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
    }
  }
}
