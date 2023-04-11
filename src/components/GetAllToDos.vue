<template>
    <div id="all-to-dos-container">
        <div class="row-capsule-header d-flex justify-content-start">
            <h5>Click any To Do to edit</h5><span class="mt-2 ms-1"><h5>⤵</h5></span>
        </div>
        <div @click="editModalStore.toggleEditModal" class="row-capsule mb-2 ms-4 rounded-top d-flex flex-row shadow" 
            v-for="object in allToDos" :key="object.id" :id="'row-capsule-'+object.id" 
            :style="{'background-color': getRandomColor()}">
            <div class="col-3 flex flex-column justify-content-between align-items-start mt-2 ms-4">
                <h5 class="row">"{{ object.title }}"</h5>
                <p class="row">{{ formatTime(object.createdDate) }}</p>
            </div>
            <div class="col-5 d-flex justify-content-start align-items-center">
                <p v-if="object.note">"{{ object.note }}"</p> <!--can use bootstrap word-wrap if overrun still a concern-->
                <p v-else class="fst-italic opacity-75">No note added</p>
            </div>
            <div class="col-3 d-flex flex-column justify-content-center align-items-end">
                <div class="row">
                    <div class="col d-flex flex-row">
                        <h6 class="text-danger">Delete To Do</h6><h6 class="text-danger mt-1 ms-1 me-3">⤵</h6>
                    </div>
                </div>

                <a href="#" class="text-danger"><font-awesome-icon icon="fa fa-window-close" size="2x" /></a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import EditToDoModal from './EditToDoModal.vue';
import {ref} from 'vue';
import {useApiStore} from '../stores/apistore'
import {useEditModalStore} from '../stores/editmodalstore'
//import {ref} from 'vue';
    export default {
        name: 'GetAllToDos',
        components: {
            EditToDoModal
        },
        data() {
            return {
                allToDos: []
            };
        },
        setup() {
            const apiStore = useApiStore();
            const editModalStore = useEditModalStore();

            return {
                apiStore, editModalStore
            }
        },
        async created() {
            const response = await axios.get(this.apiStore.apiUrl); //or this.apiStore.apiUrl
            const allToDos = response.data;
            this.allToDos = allToDos;
        },
        methods : {
            formatTime: function(timeStr) {
                var tempTime = new Date(timeStr);
                return tempTime.toLocaleString("en-US", {timeZone: 'America/Chicago'});
            },
            getRandomColor()  {
                return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
            },
        },
    }
</script>

<style>
#all-to-dos-container {
    width: 90%;
    min-height: 40vh;
}
.row-capsule-header {
    width: 95%;
    height: 15vh;
}

.row-capsule {
    width: 100%;
    min-height: 15vh !important;
    cursor: pointer !important;
}
</style>