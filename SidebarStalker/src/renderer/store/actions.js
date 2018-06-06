import axios from 'axios'

export const actions = {
    addStudentToList({ commit, state }, payload) {
        commit('ADD_STUDENT', payload);
    },

    setUserLanguage({ commit, state }, langConfig) {
        langConfig.vm.$i18n.locale = langConfig.lang;
        commit('SET_USER_LANGUAGE', langConfig.lang);
    },

    setAppSettings({ commit, state }, settings) {
        commit('SET_APP_SETTINGS', settings);
    }
};
