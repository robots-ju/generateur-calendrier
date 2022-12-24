const mix = require('laravel-mix');

mix.options({
    processCssUrls: false,
    publicPath: 'site',
});

mix.ts('src/js/app.ts', 'site/assets')
    .sass('src/sass/app.scss', 'site/assets')
    .copy('src/html/index.html', 'site')
    .version();
