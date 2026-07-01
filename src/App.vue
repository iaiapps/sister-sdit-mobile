<template>
    <div>
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
.kosong { height: 70px; }
</style>

<script setup>
import MenuComponent from "./components/MenuComponent.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const url = ref("http://149.129.249.117:8000");

const localData = ref();
const getLocalData = () => {
    localData.value = JSON.parse(localStorage.getItem("localDataSave"));
};

const menu = ref();

const menuDisable = (val) => {
    menu.value = val;
};
const menuEnable = (val) => {
    menu.value = val;
};

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
