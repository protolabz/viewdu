/*@ngInject*/
class LocaleService {
    constructor($translate, $window) {
        this.$translate = $translate;
        this.$window = $window;
        this.locales = [{
            code: 'en-US',
            name: 'English'},
        {
            code: 'it-IT',
            name: 'Italiano'}
        ];
    }

    get localeList() {
        return this.locales;
    }

    setLocale(localeCode) {
        this.$translate.use(localeCode);
        //this.$window.location.reload();
    }

    getLocale() {
        var localeCode = this.$translate.resolveClientLocale();
        var locale = _.find(this.locales, {code: localeCode});
        if(locale) {
            return localeCode;
        }
        else {
            return 'en-US';
        } 
    }
}

export default LocaleService;
