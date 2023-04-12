import {defineStore} from 'pinia';

export const useRefreshStore = defineStore('refresh', {
    id: 'refreshStore',
    state: () => ({
        refreshCycle: false
    }),
    actions: {
        toggleRefreshOn() {
            this.refreshCycle = true;
        },
    }
})