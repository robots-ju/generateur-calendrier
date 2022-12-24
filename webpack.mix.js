const mix = require('laravel-mix');

mix.options({
    processCssUrls: false,
    publicPath: 'site',
});

mix.js('src/js/app.js', 'site/assets')
    .sass('src/sass/app.scss', 'site/assets')
    .copy('src/html/index.html', 'site')
    .version();
