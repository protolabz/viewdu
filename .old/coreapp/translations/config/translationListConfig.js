export default ($translateProvider, translationHelperProvider) => {
    console.log('Inside Translations Helper');
    translationHelperProvider.translations = $translateProvider.translations();
}