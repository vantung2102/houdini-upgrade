module.exports = {
  use: [
    'postcss-import'
  , 'autoprefixer'
  , 'cssnano']
, 'local-plugins' : true
, 'autoprefixer' : {browsers: 'last 2 versions'}
, input: 'docs/index.css'
, output: 'docs/build.css'
}
