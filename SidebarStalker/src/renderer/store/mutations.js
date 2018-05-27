import Vue from 'vue';

export const mutations = {
    SET_COUNTER(state, payload) {
        Vue.set(state, 'counter', state.counter + payload);
    },

    ADD_STUDENT(state, payload) {
        state.studentsData.push(payload);
    },
    
    SET_USER_LANGUAGE(state, lang) {
        Vue.set(state, 'lang', lang);
    },

    SET_APP_SETTINGS(state, settings) {
        Vue.set(state, 'settings', settings);
    }
};