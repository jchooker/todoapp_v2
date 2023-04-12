<template>
    <!---<transition-group name="modal-animation2">-->
        <div class="del-overlay" v-show="delModalStore.delModalActive">
            <div class="del-inner-div-modal bg-light">
                <!--<transition-group name="modal-animation-inner2" v-show="editModalActive">---->
                        <div class="del-input-block-top d-flex justify-content-between border-bottom bg-light p-2">
                            <p class="text-danger">Delete To Do?</p>
                            <a href="#" @click="delModalStore.$reset" class="text-dark"><font-awesome-icon icon="fa fa-times-circle" /></a>
                        </div>
                        <div class="row modal-btn-group row d-flex justify-content-evenly m-1">
                            <button type="submit" class="btn btn-primary col me-2 ms-2" @click.prevent="delToDo(delModalStore.idOfDel)">Confirm To Do Deletion</button>
                            <button type="button" class="btn btn-secondary col me-2 ms-2" @click="delModalStore.$reset">Close</button>
                            <!-- <div class="col">
                                    <div class="">
                                    </div>
                                </div> -->
                            </div>
                            

                <!----</transition-group>---->
            </div>
        </div>
    <!----</transition-group>----->

</template>

<script>
import {useDelModalStore} from '../stores/delmodalstore'
import axios from 'axios';
import {useApiStore} from '../stores/apistore';
//import { useRefreshStore } from '../stores/refreshstore';
import { useWatchForStore } from '../stores/watchforstore';
import { storeToRefs } from 'pinia';

export default {
    name: 'DelToDo',
    props: ['delModalActive'],
    setup() {
        const delModalStore = useDelModalStore();
        const apiStore = useApiStore();
        //const refreshStore = useRefreshStore();
        const watchForStore = useWatchForStore();

        const {watchEventActive} = storeToRefs(watchForStore);

        // const delToDo = async(id) => {
        //     await axios.delete(this.apiStore.apiUrl + '/' + id);
        //     this.delModalStore.$reset;
        //     this.refreshStore.toggleRefreshOn();
        // }
        return {delModalStore, apiStore, watchEventActive};//, refreshStore};
    },
    methods: {
        async delToDo(id) {
            await axios.delete(this.apiStore.apiUrl + '/' + id);
            console.log(id);
            this.delModalStore.$reset;
            //this.refreshStore.toggleRefreshOn();
            this.watchForStore.watchEventToggleOn();
        }
    }
};
</script>

<style>
.del-overlay {
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

.del-inner-div-modal {
    border-radius: 0.5vmax;
    background-color: tan;
    height: 25vh;
    width: 35vw;
}

.del-input-block-top {
    border-radius: 0.5vmax;

}
</style>