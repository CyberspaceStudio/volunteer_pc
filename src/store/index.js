import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
      info: ''
    },
    mutations: {
        commitInfo:(state,val)=>{
            state.info = val
        },
        cancel:(state) => {
            state.info = ''
        }
    }
  });