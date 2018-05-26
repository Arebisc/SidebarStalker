import Vue from 'vue';
import Vuex from 'vuex';

import { getters } from './getters.js';
import { actions } from './actions.js';
import { mutations } from './mutations.js';

Vue.use(Vuex);

const state = {
    counter: 0,
    studentsData: [
        {
            date: '2018.04.10 13:30:35',
            firstname: 'Michał',
            lastname: 'Sibera',
            index: '126827'
        }, 
        {
            date: '2018.04.10 13:31:22',
            firstname: 'Dawid',
            lastname: 'Wojciechowski',
            index: '126112'
        }, 
        {
            date: '2018.04.10 13:30:56',
            firstname: 'Sebastian',
            lastname: 'Niespodziany',
            index: '126222'
        }, 
        {
            date: '2018.04.10 13:45:00',
            firstname: 'Bartłomiej',
            lastname: 'Wierzbinski',
            index: '126333'
        }
    ],
    lang: 'pl',
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
