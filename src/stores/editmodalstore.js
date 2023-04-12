import {defineStore} from 'pinia';

export const useEditModalStore = defineStore('editModal', {
    id: 'editModalStore',
    state: () => ({
        editModalActive: false,
        idOfEdit: null
    }),
    actions: {
        toggleEditModalOn(newId) {
            this.editModalActive = true;
            this.idOfEdit = newId;
        },
    }
})