import {defineStore} from 'pinia';

export const useWatchForStore = defineStore('watchFor', {
    id: 'watchForStore',
    state: () => ({
        watchEventActive: false
    }),
    actions: {
        watchEventToggleOn() {
            this.watchEventActive = true;
        }
    }
})