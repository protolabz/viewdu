export default ($translate, LocaleService) => {
    console.log('Set Locale');
    $translate.use(LocaleService.getLocale());
    //$translate.use('en-US');
  }