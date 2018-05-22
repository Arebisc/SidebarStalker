import Vue from 'vue';

export const mutations = {
    SET_COUNTER(state, payload) {
        Vue.set(state, 'counter', state.counter + payload);
    },

    ADD_STUDENT(state, payload) {
        Vue.set(state, 'studentsData', state.studentsData.push(payload));
    }
};