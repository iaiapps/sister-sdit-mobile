<template>
    <div class="bg-img">
        <router-view v-bind:localData="localData" v-on:menuEnable="menuEnable" v-bind:url="url"
            v-on:emitLocalData="getLocalData">
        </router-view>
        <MenuComponent v-if="menu" v-bind:localData="localData" v-on:menuDisable="menuDisable" v-bind:url="url">
        </MenuComponent>
    </div>

</template>
<style>
.bg-img {
    background-image: url('@/assets/img/bglogin.svg');
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-x: center;
    /* background-size: 500px 430px; */
    padding-top: 12px;
}

.mbottom {
    margin-bottom: 100px !important;
}
</style>

<script setup>
// import axios from 'axios';
import MenuComponent from './components/MenuComponent.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

//url
const url = ref('http://127.0.0.1:8000/api')

//variabel local data
const localData = ref()
//get localstorage data
const getLocalData = () => {
    localData.value = JSON.parse(localStorage.getItem("localDataSave"));
    // token.value = localData.value.access_token
    // teacher_id.value = localData.value.data.id
}

//variable menu
const menu = ref()
//cek menu
const menuDisable = (val) => {
    menu.value = val
}
const menuEnable = (val) => {
    menu.value = val
}

//check login
const checkPageLogin = () => {
    // getLocalData()
    if (localData.value == null) {
        router.push({ path: '/' })
        menu.value = false
    } else {
        router.push({ path: 'homepage' })
        menu.value = true
    }
}

onMounted(() => {
    getLocalData()
    checkPageLogin()
})
</script>

