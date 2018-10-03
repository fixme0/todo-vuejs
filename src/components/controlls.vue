<template>
  <div class="pl-2 pr-2 row no-gutters justify-content-between align-items-center">
    <button 
      type="button" 
      class="btn btn-info"
      @click="$store.dispatch('SHOW_TASK_FORM')"
    >
      Новая задача
    </button>
    <div class="form-check ml-2 mr-2">
      <input 
        class="form-check-input" 
        type="checkbox" 
        @change="changeProirityHanlder" 
        :value="GET_SORT_BY_PRIORITY" 
        :checked="GET_SORT_BY_PRIORITY" 
        id="priority-checkbox"
      >
      <label class="form-check-label" for="priority-checkbox">
        По приоритету
      </label>
    </div>
    <select 
      class="form-control form-control-sm w-auto" 
      :value="GET_FILTER_BY_PROJECT_NAME"
      @change="changeFilterHandler"
    >
      <option 
        v-for="project in projects" 
        :value="project" 
        :key="project"
      >
        {{project}}
      </option>
    </select>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    
    name: 'controlls',

    methods: {

      ...mapActions([
        'SORTING_BY_PRIORITY'
      ]),

      changeProirityHanlder(evt) {
        this.$store.commit('SET_SORT_BY_PRIORITY', evt.target.checked);
      },

      changeFilterHandler(evt) {
        this.$store.commit('SET_FILTER_BY_PROJECT_NAME', evt.target.value);
      }

    },

    computed: {
      ...mapGetters([
        'GET_SORT_BY_PRIORITY',
        'GET_LOCAL_KEY',
        'GET_TASKS',
        'GET_FILTER_BY_PROJECT_NAME'
      ]),

      projects() {
        this.GET_TASKS;
        return [
          'Все',
          ...new Set(
            JSON.parse(
              localStorage.getItem(this.GET_LOCAL_KEY)
            ).map(item => item.nameProject)
          )
        ];
      }

    }

  };
  

</script>
