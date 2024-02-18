<template>
    <div class="container">
        <div class="bg-white text-center p-3 mt-1 shadow rounded">
            <h1 class="fs-5 my-0">Menu Lain</h1>
        </div>

        <div class="row mt-1 gy-3 gx-3">
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <i class="bi bi-calendar-check display-3"></i>
                            <p class="mt-3 mb-0 ">Presensi Manual</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-success w-100" data-bs-toggle="modal"
                            data-bs-target="#modalshow" v-on:click="pilih('presensi')"> pilih
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <i class="bi bi-list-check display-3"></i>
                            <p class="mt-3 mb-0 ">Mutabaah</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#modalshow"
                            v-on:click="pilih('mutabaah')">pilih</button>
                    </div>
                </div>
            </div>
            <!-- <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <i class="bi bi bi-people display-3"></i>
                            <p class="mt-3 mb-0 ">Guru Pengganti</p>
                        </div>
                    </div>
                    <div class="card-footer"><button class="btn btn-success w-100" v-on:click="openIna">pilih</button></div>
                </div>
            </div> -->
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <i class="bi bi-chat-square-text display-3"></i>
                            <p class="mt-3 mb-0 ">Presensi BPI</p>
                        </div>
                    </div>
                    <div class="card-footer"><button class="btn btn-success w-100" v-on:click="openIna">pilih</button></div>
                </div>
            </div>
        </div>

        <div class="modal fade " id="modalshow" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="1"
            aria-hidden="true">
            <div class="modal-dialog vh-100">
                <div class="modal-content height">
                    <div class="modal-header py-1">
                        <h1 class="modal-title fs-5">{{ title }}</h1>
                        <div>
                            <button v-on:click="refresh" class="btn fs-4"><i class="bi bi-arrow-clockwise"></i></button>
                            <button type="button" class="btn fs-4" data-bs-dismiss="modal"><i
                                    class="bi bi-x-circle"></i></button>
                        </div>
                    </div>
                    <div class="modal-body ">
                        <iframe v-if="show" class="iframee holds-the-iframe" v-bind:src="url" title="Presensi manual">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.height {
    height: calc(100% - 20px);
}

.iframee {
    width: 100%;
    height: 100%
}

.holds-the-iframe {
    background-size: 300px;
    background-image: url(@/assets/img/loader.gif);
    background-repeat: no-repeat;
    background-position: center center;
}
</style>

<script setup>
import { ref } from 'vue';

const show = ref(true)

const timer = () => {
    setTimeout(() => {
        show.value = true
    }, 500);
}

const refresh = () => {
    show.value = false
    timer()
}

const url = ref('')
const title = ref('')
const pilih = (e) => {
    // console.log(e);
    if (e == 'presensi') {
        title.value = 'Presensi Manual'
        url.value = "https://docs.google.com/forms/d/e/1FAIpQLSdh_4CaFf3IxgE-Nz6XYeHCD-RCrRAMecTmR9EuZiSySJTAcw/viewform?usp=sf_link"
    } else if (e == 'mutabaah') {
        title.value = 'Mutabaah'
        url.value = "http://192.168.82.241:8000/mutabaah-mobile"

    }
}

</script>