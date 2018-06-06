import fs from 'fs';

const appsettingsPath = './static/appsettings.json';
const encoding = "utf8";

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

    static readAppsettingsFile = () => {  
        return new Promise((resolve, reject) => {
            fs.readFile(appsettingsPath, encoding, (err, data) => {
                debugger;
                if(err) {
                    reject(err);
                }
                else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    static saveAppsettingsFile = (appsettingsData) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(appsettingsPath, JSON.stringify(appsettingsData), encoding, (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}