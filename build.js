require('esbuild').buildSync({
    entryPoints: ['index.js'],
    bundle: true,
    outfile: 'dist/bundle.js',
    format: 'iife'
});