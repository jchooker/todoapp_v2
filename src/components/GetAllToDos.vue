<template>
    <div id="all-to-dos-container">
        <div class="mt-5">
            <div class="row-capsule mb-2 ms-4 rounded-top d-flex flex-row shadow"
                v-for="object in allToDos" :key="object.id" :id="'row-capsule-'+ object.id" @refreshToDos="refreshAfterUpdate()"
                :style="{'background-color': getRandomColor()}">
                <div class="col-3 flex flex-column justify-content-between align-items-start mt-2 ms-4">
                    <h5 class="row">"{{ object.title }}"</h5>
                    <p class="row">{{ formatTime(object.createdDate) }}</p>
                </div>
                <div class="col-4 d-flex justify-content-start align-items-center">
                    <p v-if="object.note">"{{ object.note }}"</p> <!--can use bootstrap word-wrap if overrun still a concern-->
                    <p v-else class="fst-italic opacity-75"></p>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <div class="row d-flex btn-bg pb-1 shadow-sm">
                        <div class="col">
                            <p class="text-danger deled-lbl">Delete</p>
                            <a href="#" class="text-danger" @click="delModalStore.toggleDelModalOn(object.id)"><font-awesome-icon icon="fa fa-window-close" size="2x" /></a>
                            
                        </div>
                        <div class="col">
                            <p class="deled-lbl edit-btn-content">Edit</p>
                            <a @click="editModalStore.toggleEditModalOn(object.id)" href="#" class="edit-btn-content"><font-awesome-icon icon="fa fa-pencil-square" size="2x" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {useApiStore} from '../stores/apistore';
import {useEditModalStore} from '../stores/editmodalstore';
import {useDelModalStore} from '../stores/delmodalstore';
import { computed, getCurrentInstance, watch } from 'vue';
//import { useRefreshStore } from '../stores/refreshstore';
import { storeToRefs } from 'pinia'
import {useWatchForStore} from '../stores/watchforstore';

const refreshAfterUpdate = () => {
    const instance = getCurrentInstance();
    instance.proxy.$forceUpdate();
}

    export default {
        name: 'GetAllToDos',
        components: {
            refreshAfterUpdate
        },
        data() {
            return {
                allToDos: []
            };
        },
        setup() {
            const apiStore = useApiStore();
            const editModalStore = useEditModalStore();
            const delModalStore = useDelModalStore();
            //const refreshStore = useRefreshStore();
            const watchForStore = useWatchForStore();

            //const refreshState = computed(() => refreshStore.refreshCycle);
            const {watchEventActive} = storeToRefs(watchForStore);

            watch(watchEventActive, () => {
                refreshAfterUpdate();
                //this.refreshStore.$reset;
                this.watchForStore.$reset;
            });
            

            return {
                apiStore, editModalStore, delModalStore//, refreshStore
            }
        },
        async created() {
            this.getAllToDos();
        },
        methods : {
            async getAllToDos() {
                const response = await axios.get(this.apiStore.apiUrl); //or this.apiStore.apiUrl
                const allToDos = response.data;
                this.allToDos = allToDos;
            },
            formatTime: function(timeStr) {
                var tempTime = new Date(timeStr);
                return tempTime.toLocaleString("en-US", {timeZone: 'America/Chicago'});
            },
            getRandomColor()  {
                return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
            }
        },
    }
</script>

<style>
a.edit-btn-content:hover {
    color: #FFAC1C !important;
}

#all-to-dos-container {
    width: 90%;
    min-height: 40vh;
}

.btn-bg {
    background-color: whitesmoke;
    border-radius: 0.25vmax;
}
.row-capsule-header {
    width: 95%;
    height: 15vh;
}

.row-capsule {
    width: 100%;
    min-height: 15vh !important;
}

.deled-lbl {
    margin-bottom: 0.5vh;
}

.edit-btn-content {
    color: #FFAC1C;
}
</style>