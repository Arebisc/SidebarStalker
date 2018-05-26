export class SidebarStalkerUtils {
    static getUserLanguage() {
        let lang = 'pl';
        switch (window.navigator.userLanguage || window.navigator.language) {
            case 'en':
            case 'en-US':
                lang = 'en';
                break;
            default:
                break;
        }
        return lang;
    }
}