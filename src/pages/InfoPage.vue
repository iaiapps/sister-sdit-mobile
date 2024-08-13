<template>
    <div class="bg-white text-center p-3 mt-1 shadow rounded">
        <h1 class="fs-5 my-0">Informasi</h1>
    </div>

    <div class="bg-white p-3 mt-3 rounded shadow">
        <div class="text-center">
            <img
                src="@/assets/img/logo.svg"
                alt="logo"
                class="bg-success p-1 mt-2 mb-3 logoapp"
            />
            <p>
                <b>Sister Mobile SDIT Harum</b> merupakan kumpulan aplikasi mobile di lingkungan SDIT Harapan Umat Jember
            </p>
            <p><a class="btn btn-sm btn-primary" href="https://linksister.sditharum.id">Link</a> website Sister SDIT Harum Jember</p>
            <p>
                Jika ada permasalahan terkait aplikasi bisa menghubungi
                <button v-on:click="send" class="btn btn-success btn-sm">
                    Admin
                </button>
            </p>
        </div>
        <hr />
        <p class="mb-2 text-center">List Jam Presensi</p>
        <p v-if="loading" class="bg-white p-3 mt-3 text-center rounded">
            <span>loading data...</span>
        </p>
        <div v-if="show">
            <div v-if="list">
                <ul class="list-group">
                    <li
                        class="list-group-item"
                        v-for="(item, index) in data"
                        :key="item.desc"
                    >
                        {{ index + 1 + ". " + item.desc + " : " + item.value }}
                    </li>
                </ul>
            </div>
            <div v-else class="text-center">
                <p class="mb-2">Server atau Jaringan Bermasalah !</p>
                <p>hubungi</p>
            </div>
        </div>
        <hr />

        <div class="rounded p-2 text-center bg-success text-white">
            <small>Tim IT SDIT Harum Jember</small>
            <br />
            <small>Versi Aplikasi 1.3.0</small>
        </div>
    </div>
</template>

<style scoped>
.logoapp {
    width: 65px;
    border-radius: 13px;
}
</style>

<script setup>
import { ref, defineProps, onMounted, onBeforeMount } from "vue";
import axios from "axios";

const props = defineProps({
    url: String,
    localData: Object,
});

const loading = ref(true);
const show = ref();
const data = ref();
const list = ref();

const axiosDefaultHeader = () => {
    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${props.localData.access_token}`;
};

const getData = () => {
    axiosDefaultHeader();
    axios
        .get(`${props.url}/api/settinglist`)
        .then((result) => {
            data.value = result.data.data;
            console.log(data.value);
            list.value = true;
        })
        .catch((error) => {
            console.log(error);
            // err.value = true;
        });
};

const send = () => {
    window.cordova.InAppBrowser.open("whatsapp://send?phone=6285232213939", "_system");
};
const timer = () => {
    setTimeout(() => {
        loading.value = false;
        show.value = true;
    }, 2000);
};

onMounted(() => {
    timer();
    // getData();
});

onBeforeMount(() => {
    getData();
});
</script>
