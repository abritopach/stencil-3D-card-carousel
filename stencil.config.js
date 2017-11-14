exports.config = {
  bundles: [
    { components: ['st-3D-card-carousel'] }
  ],
  collections: [
    { name: '@stencil/router' },
    { name: '@ionic/core' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
