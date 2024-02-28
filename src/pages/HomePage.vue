<template>
    <div class="container">
        <TimeComponent />
        <img src="@/assets/img/logo.svg" alt="logo" class="bg-success p-1 mt-2 logo-app" />

        <div class="bg-white text-center p-3 top shadow rounded ">
            <p class="my-1 mt-4">Assalamualaikum Wr. Wb.</p>
            <p class="fs-5 mb-1"><b>{{ props.localData.data.name }}</b></p>
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

        <div class="bg-white mt-3 text-center p-3 rounded shadow">
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

                <div v-if="selected == 'Tugas kedinasan'" class="mt-3">
                    <label for="kedinasan" class="form-label">Isi keterangan tugas kedinasannya</label>
                    <input v-model="kedinasan" id="kedinasan" type="text" class="form-control ">
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
import axios from 'axios';
import TimeComponent from '@/components/TimeComponent.vue';
import { ref, defineProps } from 'vue';

const props = defineProps({
    url: String,
    localData: Object,
})

const selected = ref();
const kedinasan = ref();

const axiosDefaultHeader = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${props.localData.access_token}`;
}

// post data scan
const postData = () => {
    axiosDefaultHeader();
    axios.post(`${props.url}/presence`, {
        teacher_id: props.localData.teacher_id,
    }).then((result) => {
        const pesan = result.data.pesan;
        alert(`${pesan}`);
    }).catch((err) => {
        const pesan = err.response.data.pesan;
        alert(`${pesan}`);
    });
}

const scan = () => {
    const result = (result) => {
        const hasilScan = result.text;
        if (hasilScan === props.localData.qrcode) {
            postData();
        } else {
            alert("data QR tidak sama");
        }
    };
    const err = (err) => {
        alert("scan QR: " + err);
    };
    const options = {
        preferFrontCamera: false,
        saveHistory: false,
        prompt: "Tempatkan QRCODE pada area tengah scanner",
        resultDisplayDuration: 0,
        formats: "QR_CODE,EAN_13,DATA_MATRIX",

    };
    window.cordova.plugins.barcodeScanner.scan(result, err, options);
}

// post data dengan note
const postSelectedItem = () => {
    if (selected.value == null) {
        alert("catatan belum dipilih !");
    } else {
        axiosDefaultHeader();
        axios.post(`${props.url}/presence`, {
            teacher_id: props.localData.teacher_id,
            note: selected.value,
            description: kedinasan.value
        }).then((result) => {
            const pesan = result.data.pesan;
            selected.value = false
            alert(pesan);
        }).catch((error) => {
            console.log(error);
            // alert(error.response.data);
        });
    }
}
</script>
