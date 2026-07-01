<template>
    <div class="d-flex align-items-center gap-2">
        <div class="text-end">
            <div class="fw-bold" style="font-size:13px;line-height:1.2">{{ timeNow }}</div>
            <div style="font-size:10px;color:var(--on-surface-variant,#64748b);line-height:1.2">{{ dateNow }}</div>
        </div>
        <div v-if="status" style="color:#059669;font-size:10px;font-weight:600" class="d-flex align-items-center gap-1">
            <span style="width:6px;height:6px;border-radius:50%;background:#059669;display:inline-block"></span>
        </div>
        <div v-else style="color:#dc2626;font-size:10px;font-weight:600">
            <span style="width:6px;height:6px;border-radius:50%;background:#dc2626;display:inline-block"></span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const timeNow = ref();
const dateNow = ref();
const status = ref();

const time = () => {
    let jam = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });
    let hari = new Date().toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
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
