import axios from 'axios'

export const actions = {
    incrementCounter({commit, state}, payload) {
        commit('SET_COUNTER', payload);
    },

    addStudentToList({ commit, state }, payload) {
        commit('ADD_STUDENT', payload);
    },

    setUserLanguage({ commit, state }, langConfig) {
        langConfig.vm.$i18n.locale = langConfig.lang;
        commit('SET_USER_LANGUAGE', langConfig.lang);
    },
};
