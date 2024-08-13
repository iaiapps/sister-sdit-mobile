<template>
    <div class="btn-group fixed-bottom shadow">
        <router-link to="/homepage" class="btn btn-success btn-sm rounded-0">
            <i class="bi bi-house-door-fill fs-5"></i>
            <span class="small d-block">Home</span>
        </router-link>

        <router-link
            to="/presencepage"
            class="btn btn-success btn-sm rounded-0"
        >
            <i class="bi bi-bar-chart-line-fill fs-5"></i>
            <span class="small d-block">Data</span>
        </router-link>
        <!-- <router-link to="/slippage" class="btn btn-success btn-sm rounded-0">
            <i class="bi bi-file-earmark-text-fill fs-5"></i>
            <span class="small d-block">Slip</span>
        </router-link> -->
        <router-link to="/apppage" class="btn btn-success btn-sm rounded-0">
            <i class="bi bi-terminal-fill fs-5"></i>
            <span class="small d-block">Apps</span>
        </router-link>

        <router-link to="/infopage" class="btn btn-success btn-sm rounded-0">
            <i class="bi bi-info-circle-fill fs-5"></i>
            <span class="small d-block">Info</span>
        </router-link>

        <button v-on:click="logout" class="btn btn-success btn-sm rounded-0">
            <i class="bi bi-x-circle-fill fs-5"></i>
            <span class="small d-block">Keluar</span>
        </button>
    </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

//router
const router = useRouter();
const toRoot = () => {
    router.push({ path: "/" });
};

//akses props
const props = defineProps({
    url: String,
    localData: Object,
});

//emit kirim data dari child ke parent
const emit = defineEmits([
    "menuDisable",
    // 'dataPresence',
]);

//axios default header
const axiosDefaultheader = () => {
    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${props.localData.access_token}`;
};

const deleteLocalData = () => {
    localStorage.clear();
};

const menu = () => {
    emit("menuDisable", false);
};

const logout = () => {
    if (confirm("Apakah anda yakin untuk keluar ?") == true) {
        axiosDefaultheader();
        deleteLocalData();
        axios
            .post(`${props.url}/api/logout`)
            .then((result) => {
                // this.items = result;
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
        toRoot();
        menu();
        console.log("berhasil logout");
    } else {
        console.log("cancel logout");
    }
};
</script>
