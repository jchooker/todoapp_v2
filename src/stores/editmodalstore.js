import {defineStore} from 'pinia';

export const useEditModalStore = defineStore('editModal', {
    id: 'editModalStore',
    state: () => ({
        storeToDos: [],
        editModalActive: false,
    }),
    actions: {
        toggleEditModal() {
            this.editModalActive = !this.editModalActive;
        }
    }
})