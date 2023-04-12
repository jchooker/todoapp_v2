import {defineStore} from 'pinia';

export const useDelModalStore = defineStore('delModal', {
    id: 'delModalStore',
    state: () => ({
        delModalActive: false,
        idOfDel: null
    }),
    actions: {
        toggleDelModalOn(newId) {
            this.delModalActive = true;
            this.idOfDel = newId;
        },
    }
})