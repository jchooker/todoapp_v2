<template>
    <!---<transition-group name="modal-animation2">-->
        <div class="editOverlay" v-show="editModalStore.editModalActive">
            <div class="edit-inner-div-modal">
                <!--<transition-group name="modal-animation-inner2" v-show="editModalActive">---->
                    <form @submit.prevent = "editToDo(editModalStore.idOfEdit)" class="form-control row pe-3">
                        <div class="input-block-top d-flex justify-content-between border-bottom bg-light">
                            <p>Edit To Do</p>
                            <a href="#" @click="editModalStore.$reset" class="text-dark"><font-awesome-icon icon="fa fa-times-circle" /></a>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                    <div class="inputBlock row mt-2">
                                        <label for="title" class="me-2 col form-check-label">Title<span class="red-text">*</span>: </label>
                                        <!---<input id="title" type="text" class="col" v-model="title" required />--->
                                        <input id="title" type="text" class="col" v-model.trim="title" required />
                                    </div>
                                    <div class="inputBlock row mt-2">
                                        <label for="deadlineDateTime" class="me-2 col form-check-label">Deadline Date<span class="red-text">*</span>: </label>
                                        <input id="deadlineDateTime" type="datetime-local" class="col" v-model="deadlineDateTime" required />
                                        <!-----<input id="deadlineDateTime" type="datetime-local" class="col" v-model="deadlineDateTime" required />---->
                                    </div>
                                    <div class="inputBlockChk row d-flex justify-content-start mt-2">
                                        <label for="isComplete" class="me-2 col-7 form-check-label">Is task already complete?</label>
                                        <input id="isComplete" type="checkbox" class="col-1 form-check-input" v-model="isComplete" />
                                        <!---<input id="isComplete" type="checkbox" class="col-1 form-check-input" value="" v-model="isComplete" />---->
                                    </div>
                                    <div class="inputBlockAlt row d-flex justify-content-start mt-2">
                                        <label for="note" class="me-2 col form-check-label">Note (Optional):</label>
                                        <!---<textarea id="note" class="col" cols="30" rows="3" v-model="note"></textarea>--->
                                        <textarea id="note" class="col" cols="30" rows="3" v-model.trim = "note"></textarea>
                                    </div>
                                    <div class="modal-btn-group row d-flex justify-content-evenly mt-3">
                                        <button type="submit" class="btn btn-primary col-5" @click="watchForStore.watchEventToggleOn()">Submit To Do Edits</button>
                                        <button type="button" class="btn btn-secondary col-5" @click="editModalStore.$reset">Close</button>
                                    </div>
                                </div>
                            </div>
                            
                        </form>
                <!----</transition-group>---->
            </div>
        </div>
    <!----</transition-group>----->

</template>

<script>
import {useEditModalStore} from '../stores/editmodalstore'
import axios from 'axios';
import {useApiStore} from '../stores/apistore';
//import { useRefreshStore } from '../stores/refreshstore';
import {useWatchForStore} from '../stores/watchforstore';
import { storeToRefs } from 'pinia';

export default {
    name: 'EditToDo',
    props: ['editModalActive'],
    setup() {
        const editModalStore = useEditModalStore();
        const apiStore = useApiStore();
        //const refreshStore = useRefreshStore();
        const watchForStore = useWatchForStore();

        const {watchEventActive} = storeToRefs(watchForStore);

        return {editModalStore, apiStore, watchEventActive};//, refreshStore};
    },
    methods: {
        async editToDo(id) {
            await axios.put(this.apiStore.apiUrl + '/' + id); <!---04/12/23 update: I was missing some of the put request arguments--->
            <!---Corrected request would be as shown in comment below, although this is currently causing a 400 error for me--->
            <!---await axios.put(this.apiStore.apiUrl + '/' + id, {
                title: this.title, deadlineDateTime: this.deadlineDateTime, 
                isComplete: this.isComplete, note: this.note
            }, 
            {
                headers: {
                'Content-Type': 'application/json'
            }});---->
            this.editModalStore.$reset;
            //this.refreshStore.toggleRefreshOn();
            this.watchForStore.watchEventToggleOn();
        }
    }
};
</script>

<style>
.editOverlay {
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
