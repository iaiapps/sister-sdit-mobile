<template>
    <div class="container vh-100">
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

        <div class="bg-white mt-3 text-center p-3 rounded shadow bottom">
            <p class="fs-5">
                Catatan: Ijin, Sakit, atau Tugas Kedinasan
            </p>
            <div class="mb-3">
                <select class="form-select">
                    <option disabled value="">Pilih salah satu</option>
                    <option value="sakit">Sakit</option>
                    <option value="ijin">Ijin</option>
                    <option value="Tugas kedinasan">Tugas Kedinasan</option>
                </select>
            </div>
            <button class="btn btn-success" v-on:click="postSelectedItem()">
                KIRIM DATA
            </button>
        </div>
        <div class="kosong"></div>
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

.menus {
    height: 130px;
}

.menu {
    display: block;
    width: 100%;
}

.menu img {
    width: 30px;
}

.menu a {
    width: 100%;
    height: 80px;
}
</style>

<script setup>
import TimeComponent from '@/components/TimeComponent.vue';


</script>
