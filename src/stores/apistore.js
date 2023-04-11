import {defineStore} from 'pinia';

export const useApiStore = defineStore('api', {
    id: 'apiStore',
    state: () => ({
        apiUrl: "http://localhost:5096/api/todo"
    })
})