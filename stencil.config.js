exports.config = {
  bundles: [
    { components: ['my-name'] }
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
