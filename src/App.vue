<script>
import {ref, onMounted, computed, watch} from 'vue';
import GetAllToDos from './components/GetAllToDos.vue';
import AddToDoModal from './components/AddToDoModal.vue';
import EditToDoModal from './components/EditToDoModal.vue';
import {useEditModalStore} from './stores/editmodalstore';

export default {
  name: 'Home',
  components: {
    GetAllToDos, AddToDoModal, EditToDoModal
  },
    setup() {
        const editModalStore = useEditModalStore()

        const addModalActive = ref(false);

        const toggleAddModal = () => {
          addModalActive.value = !addModalActive.value;
        }

        return {
            addModalActive, editModalStore, toggleAddModal
        }
    }
}

</script>

<template>
  <main>
    <AddToDoModal @close="toggleAddModal" :addModalActive = "addModalActive"></AddToDoModal>
    <EditToDoModal v-if="editModalStore.editModalActive"></EditToDoModal>
    <div id="pseudo-header" class="d-flex justify-content-start align-items-start">
      <h1>ToDo App</h1>
      <button @click="toggleAddModal" class="btn btn-primary mt-2 ms-5 shadow-sm border border-light border-2" type="button">Add new To Do to list</button>
    </div>
    <GetAllToDos></GetAllToDos>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Alata', sans-serif;
}

header {
  width: 100vw;
  min-height: 15vh;
}

main {
  width: 100vw;
  min-height: 50vh;
}

</style>
