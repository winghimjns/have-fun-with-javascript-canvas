const mix = require('laravel-mix');

mix.setPublicPath('dist');
mix
    .js('assets/js/app.js', 'js');
