<template>
    <div class="text-white d-flex justify-content-end pb-2">
        <div class="text-end pe-3">
            <h1 class="display-5 fw-bold m-0">{{ timeNow }}</h1>
            <h1 class="fs-4 m-0">{{ dateNow }}</h1>
        </div>
        <div class="status p1 text-center text-dark">
            <div v-if="status">
                <span> <i class="bi bi-wifi fs-3 "></i><br>ON</span>
            </div>
            <div v-else>
                <span><i class="bi bi-wifi-off fs-3 text-danger"></i><br>OFF</span>
            </div>
        </div>
    </div>
</template>

<style>
.status {
    width: 40px;
    color: #212529;
    background-color: white;
    border-radius: 8px;
}
</style>
<script setup>
import { ref, } from 'vue';

const timeNow = ref();
const dateNow = ref();
const status = ref();

const time = () => {
    let jam = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });

    let hari = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    timeNow.value = jam;
    dateNow.value = hari;
}
time();

const check = () => {
    status.value = navigator.onLine;
    window.addEventListener("online", () => {
        status.value = true;
    });
    window.addEventListener("offline", () => {
        status.value = false;
    });
};
check()
</script>