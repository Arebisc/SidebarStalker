import axios from 'axios'

export const actions = {
    incrementCounter({commit, state}, payload) {
        commit('incrementCounter', 1);
    }
};
