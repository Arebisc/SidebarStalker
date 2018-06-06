import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { en } from './locales/en'
import { pl } from './locales/pl'

import localePl from 'element-ui/lib/locale/lang/pl'
import localeEn from 'element-ui/lib/locale/lang/en'

Vue.use(VueI18n)

const locale = 'en'

const messages = {
    en: {
        custom: en,
        ...localeEn
    },
    pl: {
        custom: pl,
        ...localePl
    }
}

const i18n = new VueI18n({
    locale,
    messages
})

export default i18n;