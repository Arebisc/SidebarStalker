import Vue from 'vue';

export const mutations = {
    SET_COUNTER(state, payload) {
        Vue.set(state, 'counter', state.counter + payload);
    },

    ADD_STUDENT(state, payload) {
        state.studentsData.push(payload);
    }
};