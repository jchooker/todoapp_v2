import {defineStore} from 'pinia';

export const useAddModalStore = defineStore('addModal', {
    id: 'addModalStore',
    state: () => ({
        addModalActive: false
    }),
    actions: {
        toggleAddModalOn() {
            this.addModalActive = true
        }
    }
})