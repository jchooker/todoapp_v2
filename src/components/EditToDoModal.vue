<template>
    <!---<transition-group name="modal-animation2">-->
        <div class="editOverlay" v-show="editModalStore.editModalActive">
            <div class="inner-div-modal">
                <!--<transition-group name="modal-animation-inner2" v-show="editModalActive">---->
                    <form @submit.prevent = "submitForm" action="" class="form-control row pe-3">
                        <div class="input-block-top d-flex justify-content-between border-bottom bg-light">
                            <p>Edit To Do</p>
                            <a href="#" @click="editModalStore.toggleEditModal" class="text-dark"><font-awesome-icon icon="fa fa-times-circle" /></a>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                    <div class="inputBlock row mt-2">
                                        <label for="title" class="me-2 col form-check-label">Title<span class="red-text">*</span>: </label>
                                        <!---<input id="title" type="text" class="col" v-model="title" required />--->
                                        <input id="title" type="text" class="col" required />
                                    </div>
                                    <div class="inputBlock row mt-2">
                                        <label for="deadlineDateTime" class="me-2 col form-check-label">Deadline Date<span class="red-text">*</span>: </label>
                                        <input id="deadlineDateTime" type="datetime-local" class="col" required />
                                        <!-----<input id="deadlineDateTime" type="datetime-local" class="col" v-model="deadlineDateTime" required />---->
                                    </div>
                                    <div class="inputBlockChk row d-flex justify-content-start mt-2">
                                        <label for="isComplete" class="me-2 col-7 form-check-label">Is task already complete?</label>
                                        <input id="isComplete" type="checkbox" class="col-1 form-check-input" value="" />
                                        <!---<input id="isComplete" type="checkbox" class="col-1 form-check-input" value="" v-model="isComplete" />---->
                                    </div>
                                    <div class="inputBlockAlt row d-flex justify-content-start mt-2">
                                        <label for="note" class="me-2 col form-check-label">Note (Optional):</label>
                                        <!---<textarea id="note" class="col" cols="30" rows="3" v-model="note"></textarea>--->
                                        <textarea id="note" class="col" cols="30" rows="3"></textarea>
                                    </div>
                                    <div class="modal-btn-group row d-flex justify-content-evenly mt-3">
                                        <button type="submit" class="btn btn-primary col-5">Submit To Do Edits</button>
                                        <button type="button" class="btn btn-secondary col-5" @click="editModalStore.toggleEditModal">Close</button>
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

export default {
    name: 'EditToDo',
    props: ['editModalActive'],
    setup() {
        const editModalStore = useEditModalStore()

        return {editModalStore};
    },
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