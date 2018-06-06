export default class TranslationHelper {
    constructor() {
        this.translations = {};
    }

    $get() {
        return {
            translations: this.translations,
            add: function(key, value) {
                if(key && value) {
                    this.translations['en-US'][key] = value;
                }
            }
        }
    }
}