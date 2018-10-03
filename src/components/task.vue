<template>
  <div class="card mb-4" :class="{'editing': edit}">
    <div class="card-body">
      <h5 class="card-title">{{taskData.headerTask}}</h5>
      <div class="row no-gutters mb-3 justify-content-between">
        <h6 class="card-subtitle">
          Проект:
          <span class="text-primary">
            {{taskData.nameProject}}
          </span>
        </h6>
        <h6 class="card-subtitle font-italic">
          Приоритет: {{taskData.priority}}
        </h6>
      </div>
      <p class="card-text" v-if="visibleDescr">
        {{taskData.description}}
      </p>
      <button 
        type="button" 
        class="btn card-link btn-success" 
        @click="blockBtn && START_EDIT_TASK(taskData.id)"
      >
        Изменить
      </button>
      <button 
        type="button" 
        class="btn card-link btn-danger" 
        @click="blockBtn && DELETE_TASK(taskData.id)"
      >
        Закрыть
      </button>
      <button 
        type="button" 
        class="btn card-link btn-primary" 
        @click="blockBtn && (visibleDescr = !visibleDescr)"
      >
        {{textBtn}}
      </button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    
    name: 'task',

    props: {
      taskData: {
        type: Object,
        default() {
          return {};
        }
      }
    },

    computed: {

      ...mapGetters([
        'GET_EDIT_TASK_ID'
      ]),

      textBtn() {
        return this.visibleDescr ? 'Свернуть' : 'Развернуть';
      },

      edit() {
        return this.GET_EDIT_TASK_ID == this.taskData.id
      },

      blockBtn() {
        return this.GET_EDIT_TASK_ID && !this.edit ? false : true;
      }

    },

    methods: {

      ...mapActions([
        'DELETE_TASK',
        'START_EDIT_TASK'
      ])

    },

    data: () => ({
      visibleDescr: false
    })

  };
  


</script>
