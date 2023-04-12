<script>
import {ref} from 'vue';
import GetAllToDos from './components/GetAllToDos.vue';
import AddToDoModal from './components/AddToDoModal.vue';
import EditToDoModal from './components/EditToDoModal.vue';
import DelToDoModal from './components/DelToDoModal.vue';
import {useEditModalStore} from './stores/editmodalstore';
import {useDelModalStore} from './stores/delmodalstore';
import { useAddModalStore } from './stores/addmodalstore';

export default {
  name: 'Home',
  components: {
    GetAllToDos, AddToDoModal, EditToDoModal, DelToDoModal
  },
    setup() {
        const editModalStore = useEditModalStore();
        const delModalStore = useDelModalStore();
        const addModalStore = useAddModalStore();

        const addModalActive = ref(false);

        return {
            addModalActive, editModalStore, delModalStore, addModalStore
        }
    }
}

</script>

<template>
  <main>
    <AddToDoModal v-if="addModalStore.addModalActive"></AddToDoModal>
    <EditToDoModal v-if="editModalStore.editModalActive"></EditToDoModal>
    <DelToDoModal v-if="delModalStore.delModalActive"></DelToDoModal>
    <div id="pseudo-header" class="d-flex justify-content-start align-items-start">
      <h1>ToDo App</h1>
      <button @click="addModalStore.toggleAddModalOn" class="btn btn-primary mt-2 ms-5 shadow-sm border border-light border-2" type="button">Add new To Do to list</button>
    </div>
    <GetAllToDos :key="allTodos"></GetAllToDos>
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
