import Vue from 'vue';
import Vuex from 'vuex';

import { getters } from './getters.js';
import { actions } from './actions.js';
import { mutations } from './mutations.js';

Vue.use(Vuex);

const state = {
    counter: 0,
    studentsData: [],
    lang: 'pl',
    settings: {
        cameraIp: '',
        cameraPort: ''
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
