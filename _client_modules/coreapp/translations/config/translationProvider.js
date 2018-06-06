export default ($translateProvider) => {
  console.log('Configure Provider');
  // configures staticFilesLoader
  $translateProvider.useStaticFilesLoader({
    'prefix': 'translations/locale-',
    'suffix': '.json'
  });
  $translateProvider.useSanitizeValueStrategy('sanitize');
}