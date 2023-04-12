<template>
    <!---<transition-group name="modal-animation">--->
        <div class="overlay" v-show="addModalActive">
            <div class="inner-div-modal">
                <!---<transition-group name="modal-animation-inner" v-show="addModalActive">--->
                    <form @submit.prevent="submitNewToDo()" class="form-control row pe-3">
                        <div class="input-block-top d-flex justify-content-between border-bottom bg-light">
                            <p>Add To Do to List</p>
                            <a href="#" @click="addModalStore.$reset" class="text-dark"><font-awesome-icon icon="fa fa-times-circle" /></a>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                    <div class="inputBlock row mt-2">
                                        <label for="title" class="me-2 col form-check-label">Title<span class="red-text">*</span>: </label>
                                        <!---<input id="title" type="text" class="col" v-model="title" required />--->
                                        <input v-model.trim="title" id="title" type="text" class="col" ref="title"  required />
                                    </div>
                                    <div class="inputBlock row mt-2">
                                        <label for="deadlineDateTime" class="me-2 col form-check-label">Deadline Date<span class="red-text">*</span>: </label>
                                        <input v-model="deadlineDateTime" id="deadlineDateTime" type="datetime-local" class="col" ref="deadlineDateTime" required />
                                        <!-----<input id="deadlineDateTime" type="datetime-local" class="col" v-model="deadlineDateTime" required />---->
                                    </div>
                                    <div class="inputBlockChk row d-flex justify-content-start mt-2">
                                        <label for="isComplete" class="me-2 col-7 form-check-label">Is task already complete?</label>
                                        <input v-model="isComplete" id="isComplete" type="checkbox" class="col-1 form-check-input" ref="isComplete" />
                                        <!---<input id="isComplete" type="checkbox" class="col-1 form-check-input" value="" v-model="isComplete" />---->
                                    </div>
                                    <div class="inputBlockAlt row d-flex justify-content-start mt-2">
                                        <label for="note" class="me-2 col form-check-label">Note (Optional):</label>
                                        <!---<textarea id="note" class="col" cols="30" rows="3" v-model="note"></textarea>--->
                                        <textarea id="note" class="col" cols="30" rows="3" v-model.trim="note" ref="note"></textarea>
                                    </div>
                                    <div class="modal-btn-group row d-flex justify-content-evenly mt-3">
                                        <button type="submit" class="btn btn-primary col-5">Submit To Do to list</button>
                                        <button type="button" class="btn btn-secondary col-5" @click="addModalStore.$reset">Close</button>
                                    </div>
                                </div>
                            </div>
                            
                        </form>
                <!---</transition-group>--->
            </div>
        </div>
    <!---</transition-group>--->

</template>

<script>
import axios from 'axios';
import {useApiStore} from '../stores/apistore';
import { useAddModalStore } from '../stores/addmodalstore';
//import { useRefreshStore } from '../stores/refreshstore';
import {useWatchForStore} from '../stores/watchforstore';
import { storeToRefs } from 'pinia';
export default {
    props: ['addModalActive'],
    setup() {
        const apiStore = useApiStore();
        const addModalStore = useAddModalStore();
        const watchForStore = useWatchForStore();
        //const refreshStore = useRefreshStore();

        const {watchEventActive} = storeToRefs(watchForStore);

        return{apiStore, addModalStore, watchEventActive};//, refreshStore};
    },
    data() {
        return {
            title: "",
            deadlineDateTime: null,
            isComplete: false,
            note: null,
        }
    },
    methods: {
        async submitNewToDo() {
            const response = await axios.post(this.apiStore.apiUrl, 
            {
                title: this.title, deadlineDateTime: this.deadlineDateTime, 
                isComplete: this.isComplete, note: this.note
            }); //or this.apiStore.apiUrl
            //^rerun get after...?
            //const allToDos = response.data;
            //this.allToDos = allToDos;
            this.addModalStore.$reset;
            //this.refreshStore.toggleRefreshOn();
            this.watchForStore.watchEventToggleOn();
        },
        isISODT(str) {
            if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
        },
        getNowDT() {
            const now = new Date();
            const nowAdj = now.toISOString();
            return this.formatDT(nowAdj);
        },
        formatDT(dt) { //underlying assumption that all of my various sofware is formatting ISO the same way
                        //(Z at end)
            if (dt.slice(-1) === "Z") {
                var reg = new RegExp(/\.\w+$/);
                return dt.replace(reg, '');
            }
            else {
                console.log("datetime may be non-ISO formatted");
                return dt;
            }
        }
        // forceToDosUpdate() {
        //     this.title = "";
        //     this.deadlineDateTime = "";
        //     this.isComplete = "";
        //     this.note = "";
        // }
    },
};
</script>

<style>
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    margin: -15px 0 0 -15px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>