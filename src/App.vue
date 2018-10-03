<template>
  <div id="app">
    <div class="wrapper mt-5 mb-5">
      <h2 class="text-center mb-4">My Crazy TODO)</h2>

      <div 
        id="todo-list" 
        class="pl-2 pr-2" 
        v-if="GET_VISIBLE_CONTROLL || GET_EDIT_TASK_ID"
        :class="{'edit-mode': GET_EDIT_TASK_ID}"
      >
        <div class="alert alert-warning" role="alert" v-if="!getTasks.length">
          У вас нету задач, везет вам)
        </div>
        <task v-else v-for="task in getTasks" :key="task.id" :taskData="task" />
      </div>

      <controlls v-show="GET_VISIBLE_CONTROLL" />

      <task-form v-if="!GET_VISIBLE_CONTROLL" />

    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import Task from './components/task';
  import Controlls from './components/controlls';
  import TaskForm from './components/taskForm';
  
  export default {
    
    name: 'App',

    data: () => ({

    }),

    components: {
      Task,
      Controlls,
      TaskForm
    },

    methods: {

      ...mapActions([
        'INIT_STATE'
      ])

    },

    computed: {

      ...mapGetters([
        'GET_TASKS',
        'GET_VISIBLE_CONTROLL',
        'GET_EDIT_TASK_ID',
        'GET_SORT_BY_PRIORITY',
        'GET_FILTER_BY_PROJECT_NAME'
      ]),

      getTasks() {
        this.INIT_STATE();
        if(this.GET_SORT_BY_PRIORITY) {
          this.$store.commit('SORT_TASKS');
        };

        if(this.GET_FILTER_BY_PROJECT_NAME != 'Все') {
          this.$store.commit('FILTER_TASKS_BY_PROJECT_NAME', this.GET_FILTER_BY_PROJECT_NAME);
        }

        return this.GET_TASKS
      }

    },

    created() {
      this.INIT_STATE();
    }

  };
  

</script>

<style lang="sass" src="./App.sass"></style>