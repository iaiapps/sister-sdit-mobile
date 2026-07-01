<template>
    <div class="page-info">
        <div class="page-header">
            <h1>Informasi</h1>
        </div>

        <div class="content px-3">
            <div class="info-card">
                <img src="@/assets/img/logo.svg" alt="logo" class="info-logo" />
                <p><b>Sister Mobile SDIT Harum</b> merupakan kumpulan aplikasi mobile di lingkungan SDIT Harapan Umat Jember</p>
                <p><a class="btn btn-sm btn-primary" href="https://linksister.sditharum.id">Link</a> website Sister SDIT Harum Jember</p>
                <p>Jika ada permasalahan terkait aplikasi bisa menghubungi <button v-on:click="send" class="btn btn-success btn-sm">Admin</button></p>
            </div>

            <div class="schedule-card">
                <p class="schedule-title">List Jam Presensi</p>
                <p v-if="loading" class="text-center text-muted small">loading data...</p>
                <div v-if="show">
                    <div v-if="list">
                        <div class="schedule-item" v-for="(item, index) in data" :key="item.desc">
                            <span class="label">{{ index + 1 + ". " + item.desc }}</span>
                            <span class="value">{{ item.value }}</span>
                        </div>
                    </div>
                    <div v-else class="text-center"><p class="small text-muted">Server atau Jaringan Bermasalah!</p></div>
                </div>
            </div>

            <div class="footer-info">
                <small>Tim IT SDIT Harum Jember</small>
                <VersionComponent/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-info { min-height: 100vh; background: #f0f2f5; padding-bottom: 70px; }
.page-header {
    background: white;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
}
.page-header h1 {
    font-size: 16px; font-weight: 700; margin: 0;
    color: #1a1a2e; text-align: center;
}
.content { padding-top: 12px; }
.info-card {
    background: white; border-radius: 14px;
    padding: 24px 16px; text-align: center;
    border: 1px solid #e2e8f0; margin-bottom: 12px;
}
.info-logo { width: 56px; margin-bottom: 12px; }
.info-card p { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 8px; }
.info-card p:last-child { margin-bottom: 0; }
.schedule-card {
    background: white; border-radius: 14px;
    padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 12px;
}
.schedule-title {
    font-size: 14px; font-weight: 600; color: #1a1a2e;
    margin-bottom: 10px; text-align: center;
}
.schedule-item {
    display: flex; justify-content: space-between;
    padding: 8px 0; font-size: 13px;
    border-bottom: 1px solid #f0f0f0;
}
.schedule-item:last-child { border-bottom: none; }
.schedule-item .label { color: #64748b; }
.schedule-item .value { font-weight: 600; color: #1a1a2e; }
.footer-info {
    background: #077944; color: white;
    border-radius: 14px; padding: 14px;
    text-align: center;
}
.footer-info small { display: block; font-size: 12px; margin-bottom: 2px; opacity: 0.8; }
</style>

<script setup>
import { ref, defineProps, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import VersionComponent from "@/components/VersionComponent.vue";

const props = defineProps({
    url: String,
    localData: Object,
});

const loading = ref(true);
const show = ref();
const data = ref([]);
const list = ref();

const axiosDefaultHeader = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${props.localData.access_token}`;
};

const getData = () => {
    axiosDefaultHeader();
    axios
        .get(`${props.url}/api/settinglist`)
        .then((result) => {
            data.value = result.data.data || [];
            console.log(data.value);
            list.value = true;
        })
        .catch((error) => {
            console.log(error);
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
});

onBeforeMount(() => {
    getData();
});
</script>
