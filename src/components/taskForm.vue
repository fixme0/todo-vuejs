<template>
  
  <form class="pl-2 pr-2" @submit.prevent="saveData">
    <div class="form-group">
      <label for="form-header-title">Заголовок задачи</label>
      <input v-model="headerTask" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="form-header-name">Название проекта</label>
      <input v-model="nameProject" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="form-header-priority">Приоритет</label>
      <select v-model="priority" class="form-control form-control-sm w-100">
        <option v-for="lvl in priorityLvl" :key="lvl" :value="lvl">
          {{lvl}}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Описание</label>
      <textarea v-model="description" class="form-control"></textarea>
    </div>
    
    <button type="submit" class="btn btn-success">Сохранить</button>
    <button 
      type="button" 
      class="btn btn-warning ml-3"
      @click="CLOSE_TASK_FORM"
    >
      Отмена
    </button>
  </form>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    
    name: 'taskForm',
    
    data: () => ({
      priorityLvl: [1, 2, 3, 4, 5],
      headerTask: '',
      nameProject: '',
      priority: 1,
      description: ''
    }),

    methods: {

      ...mapActions([
        'CLOSE_TASK_FORM',
        'ADD_NEW_TASK',
        'EDIT_TASK'
      ]),
      
      saveData() {
        const method = this.GET_EDIT_TASK_ID ? 'EDIT_TASK' : 'ADD_NEW_TASK';
        this[method](
          {
            headerTask: this.headerTask,
            nameProject: this.nameProject,
            priority: this.priority,
            description: this.description
          }
        )
      }

    },

    computed: {
      ...mapGetters([
        'GET_EDIT_TASK_ID',
        'GET_TASK_BY_ID',
      ])
    },

    created() {
      if(this.GET_EDIT_TASK_ID) {
        const task = this.GET_TASK_BY_ID(this.GET_EDIT_TASK_ID);
        const blockProperties = ['id'];
        for (const key in task) {
          if(blockProperties.find(prop => prop == key)) return;
          this[key] = task[key]
        }
      }
    },

    destroyed() {
      this.headerTask = '';
      this.nameProject = '';
      this.priority = 1;
      this.description = '';
    },

  };
  

</script>
