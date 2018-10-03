import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    TASKS: [],
    EDIT_TASK_ID: null,
    VISIBLE_CONTROLL: true,
    LOCAL_KEY: 'todolist',
    SORT_BY_PRIORITY: false,
    FILTER_BY_PROJECT_NAME: 'Все'
  },
  mutations: {
    SET_TASKS: (state, payload) => state.TASKS = payload,
    ADD_TASK: (state, payload) => state.TASKS.push(payload),
    CHANGE_TASK: (state, {idx, payload}) => state.TASKS.splice(idx, 1, payload),
    DELETE_TASK: (state, idx) => state.TASKS.splice(idx, 1),
    SORT_TASKS: state => state.TASKS.sort((a, b) => a.priority - b.priority),
    SET_VISIBLE_CONTROLL: (state, payload) => state.VISIBLE_CONTROLL = payload,
    SET_EDIT_TASK_ID: (state, id) => state.EDIT_TASK_ID = id,
    SET_SORT_BY_PRIORITY: (state, payload) => state.SORT_BY_PRIORITY = payload,
    SET_FILTER_BY_PROJECT_NAME: (state, payload) => state.FILTER_BY_PROJECT_NAME = payload,
    FILTER_TASKS_BY_PROJECT_NAME: (state, payload) => state.TASKS = state.TASKS.filter(task => task.nameProject == payload)
  },
  actions: {

    INIT_STATE: ({commit, getters}) => {
      !localStorage.getItem(getters.GET_LOCAL_KEY) && localStorage.setItem(getters.GET_LOCAL_KEY, JSON.stringify([]));
      commit(
        'SET_TASKS',
        JSON.parse(
          localStorage.getItem(getters.GET_LOCAL_KEY)
        )
      )
    },

    ADD_NEW_TASK: ({commit, dispatch, getters}, payload) => {
      payload.id = getters.GENERATE_RANDOM_ID();
      commit('ADD_TASK', payload);
      dispatch('UPDATE_LOCAL_STORE', {
        method: 'add',
        payload
      });
      dispatch('CLOSE_TASK_FORM');
    },

    EDIT_TASK: ({commit, getters, dispatch}, payload) => {
      payload.id = getters.GET_EDIT_TASK_ID;
      const idx = getters.GET_TASKS.indexOf(
        getters.GET_TASK_BY_ID(payload.id)
      );
      commit('CHANGE_TASK', {
        idx,
        payload
      });
      dispatch('UPDATE_LOCAL_STORE', {
        method: 'replace',
        payload
      });
      dispatch('CLOSE_TASK_FORM');
    },

    DELETE_TASK: ({getters, commit, dispatch}, id) => {
      commit(
        'DELETE_TASK',
        getters.GET_TASKS.indexOf(
          getters.GET_TASK_BY_ID(id)
        )
      );
      dispatch('UPDATE_LOCAL_STORE', {
        method: 'delete',
        payload: id
      });
    },

    UPDATE_LOCAL_STORE: ({getters}, {method, payload = null}) => {
      const localState = JSON.parse(localStorage.getItem(getters.GET_LOCAL_KEY));

      switch(method) {
        case 'add':
          localState.push(payload);
          break;
        case 'delete':
          localState.splice(
            localState.indexOf(localState.find(item => item.id == payload)),
            1
          );
          break;
        case 'replace':
          localState.splice(
            localState.indexOf(localState.find(item => item.id == payload.id)),
            1,
            payload
          );
          break;
      }
      localStorage.setItem(
        getters.GET_LOCAL_KEY,
        JSON.stringify(
          localState
        )
      );
    },

    SHOW_TASK_FORM: ({commit}) => {
      commit('SET_VISIBLE_CONTROLL', false);
    },

    CLOSE_TASK_FORM: ({commit}) => {
      commit('SET_VISIBLE_CONTROLL', true);
      commit('SET_EDIT_TASK_ID', null);
    },

    START_EDIT_TASK: ({dispatch, commit}, id) => {
      dispatch('SHOW_TASK_FORM');
      commit('SET_EDIT_TASK_ID', id);
    }

  },
  getters: {
    GET_TASKS: state => state.TASKS,
    GET_TASK_BY_ID: state => id => state.TASKS.find(task => task.id == id),
    GET_VISIBLE_CONTROLL: state => state.VISIBLE_CONTROLL,
    GENERATE_RANDOM_ID: () => () => `_${Math.random().toString(36).substr(2, 9)}`,
    GET_LOCAL_KEY: state => state.LOCAL_KEY,
    GET_EDIT_TASK_ID: state => state.EDIT_TASK_ID,
    GET_SORT_BY_PRIORITY: state => state.SORT_BY_PRIORITY,
    GET_FILTER_BY_PROJECT_NAME: state => state.FILTER_BY_PROJECT_NAME
  }
})
