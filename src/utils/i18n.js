import zh from "../../i18n/zh-cn.js";
import en from "../../i18n/en-us.js";

class I18n {
    language;
    i18nData = {};
    constructor() {
        let language;
        try {
            language =
                JSON.parse(localStorage.Wikiplus_Settings)["language"] ||
                window.navigator.language.toLowerCase();
        } catch (e) {
            language = window.navigator.language.toLowerCase();
        }
        this.language = language;
        // Preload 2 languages
        this.i18nData["zh-cn"] = zh;
        this.i18nData["en-us"] = en;
    }
    translate(key, placeholders = []) {
        let result = "";
        // Determine which language to use
        let lang = this.language;
        if (!(lang in this.i18nData)) {
            // Fallback to English for unsupported languages
            lang = "en-us";
        }

        if (key in this.i18nData[lang]) {
            result = this.i18nData[lang][key];
        } else if (lang !== "en-us" && key in this.i18nData["en-us"]) {
            // Fallback to English if key not found in current language
            result = this.i18nData["en-us"][key];
        } else {
            result = key;
        }

        if (placeholders.length > 0) {
            placeholders.forEach((placeholder, index) => {
                result = result.replace(`$${index + 1}`, placeholder);
            });
        }
        return result;
    }
}

export default new I18n();
