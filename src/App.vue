<template>
    <div class="bg-img container">
        <router-view
            v-bind:localData="localData"
            v-on:menuEnable="menuEnable"
            v-bind:url="url"
            v-on:emitLocalData="getLocalData"
        >
        </router-view>
        <div class="kosong"></div>
        <MenuComponent
            v-if="menu"
            v-bind:localData="localData"
            v-on:menuDisable="menuDisable"
            v-bind:url="url"
        >
        </MenuComponent>
    </div>
</template>

<style>
.bg-img {
    background-image: url("@/assets/img/bglogin.svg");
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-x: center;
    padding-top: 12px;
}

.kosong {
    height: 90px;
}
</style>

<script setup>
// import axios from 'axios';
import MenuComponent from "./components/MenuComponent.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

//url
// const url = ref("http://127.0.0.1:8000");
// const url = ref('http://192.168.82.241:8000') //my local ip adress
// const url = ref('http://sister.sditharum.id:8000') //sister ip adress
const url = ref("http://149.129.249.117:8000"); //sister ip adress

//variabel local data and get
const localData = ref();
const getLocalData = () => {
    localData.value = JSON.parse(localStorage.getItem("localDataSave"));
};

//variable menu
const menu = ref();

//cek menu
const menuDisable = (val) => {
    menu.value = val;
};
const menuEnable = (val) => {
    menu.value = val;
};

//check login
const checkPageLogin = () => {
    if (localData.value == null) {
        router.push({ path: "/" });
        menu.value = false;
    } else {
        router.push({ path: "homepage" });
        menu.value = true;
    }
};

onMounted(() => {
    getLocalData();
    checkPageLogin();
});
</script>
