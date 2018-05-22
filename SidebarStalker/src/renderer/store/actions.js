import axios from 'axios'

export const actions = {
    incrementCounter({commit, state}, payload) {
        commit('SET_COUNTER', payload);
    },

    addStudentToList({ commit, state }, payload) {
        commit('ADD_STUDENT', payload);
    }
};
