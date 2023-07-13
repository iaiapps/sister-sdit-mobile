<template>
    <div class="container">
        <TimeComponent />
        <img src="@/assets/img/logo.svg" alt="logo" class="bg-success p-1 mt-2 logo-app" />

        <div class="bg-white text-center p-3 top shadow rounded ">
            <p class="my-1 mt-4">Assalamualaikum Wr. Wb.</p>
            <p class="fs-5 mb-1"><b>Teacher Name</b></p>
        </div>

        <div class="bg-white mt-3 text-center p-3 rounded shadow">
            <p class="fs-5">
                Klik tombol berikut untuk <br />
                mengisi presensi
            </p>
            <button class="btn btn-success btn-lg mt-1" v-on:click="scan()">
                SCAN QR
            </button>
        </div>

        <div class="bg-white mt-3 text-center p-3 rounded shadow mbottom">
            <p class="fs-5">
                Catatan: Ijin, Sakit, atau Tugas Kedinasan
            </p>
            <div class="mb-3">
                <select class="form-select" v-model="selected">
                    <option disabled value="">Pilih salah satu</option>
                    <option value="sakit">Sakit</option>
                    <option value="ijin">Ijin</option>
                    <option value="Tugas kedinasan">Tugas Kedinasan</option>
                </select>

                <div v-if="selected" class="mt-3">
                    <label for="kedinasan" class="form-label">Isi keterangan tugas kedinasannya</label>
                    <input id="kedinasan" type="text" class="form-control ">
                </div>
            </div>
            <button class="btn btn-success" v-on:click="postSelectedItem()">
                KIRIM DATA
            </button>
        </div>

    </div>
</template>

<style>
.logo-app {
    position: absolute;
    z-index: 9;
    left: 0;
    right: 0;
    width: 70px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 13px;
}

.top {
    margin-top: 50px !important;
}
</style>

<script setup>
import TimeComponent from '@/components/TimeComponent.vue';
import { ref } from 'vue';

const selected = ref();
const select = () => {
    if (selected.value == 'Tugas kedinasan')
        selected.value = true
}
select()


</script>
