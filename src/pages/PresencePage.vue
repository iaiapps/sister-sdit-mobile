<template>
    <div class="page-presence">
        <div class="page-header">
            <h1>REKAP DATA PRESENSI</h1>
        </div>

        <div class="content px-3">
            <p v-if="loading" class="bg-white p-3 mt-3 text-center rounded" style="border: 1px solid #e2e8f0;">loading data...</p>

            <div v-if="show" class="mt-3">
                <div class="table-wrap">
                    <template v-if="table">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Tgl</th>
                                <th>Datang</th>
                                <th>Pulang</th>
                                <th>Ket</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in data" :key="index">
                                <td>{{
                                    new Date(item.created_at).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                    })
                                }}</td>
                                <td>{{ item.time_in }}</td>
                                <td>{{ item.time_out }}</td>
                                <td>{{
                                    item.note +
                                    " " +
                                    (item.description == null || item.description == " "
                                        ? " "
                                        : ": " + item.description)
                                }}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                <template v-else>
                    <div class="text-center p-4">
                        <p v-if="error" class="m-0" style="color: #64748b;">Terjadi kesalahan: {{ error }}</p>
                        <p v-else class="m-0" style="color: #64748b;">Data Presensi tidak ditemukan.</p>
                    </div>
                </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-presence { min-height: 100vh; background: #f0f2f5; padding-bottom: 70px; }
.page-header {
    background: white;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
}
.page-header h1 {
    font-size: 16px; font-weight: 700; margin: 0;
    color: #1a1a2e; text-align: center;
}
.table-wrap {
    background: white; border-radius: 14px;
    overflow: hidden; border: 1px solid #e2e8f0;
}
.table-wrap table { margin: 0; font-size: 13px; }
.table-wrap th {
    background: #f8fafc; color: #64748b;
    font-weight: 600; font-size: 11px;
    text-transform: uppercase; letter-spacing: 0.5px;
    padding: 12px 10px; border-bottom: 1px solid #e2e8f0;
}
.table-wrap td {
    padding: 12px 10px; vertical-align: middle;
    border-bottom: 1px solid #f0f0f0; color: #334155;
}
.table-wrap tr:last-child td { border-bottom: none; }
</style>

<script setup>
import { ref, computed, defineProps, onBeforeMount, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
    url: String,
    localData: Object,
});

const isGroupA = computed(() => props.localData?.group === 'A');
const loading = ref(true);
const show = ref(false);
const data = ref([]);
const error = ref(null);
const table = ref(false);

const axiosDefaultHeader = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${props.localData.access_token}`;
    axios.defaults.headers.get['version'] = props.localData.version;
};

const getData = async () => {
    if (!props.localData?.teacher_id) return;
    axiosDefaultHeader();
    try {
        const endpoint = isGroupA.value ? 'presence' : 'presencekaryawan';
        const result = await axios.get(`${props.url}/api/${endpoint}/${props.localData.teacher_id}`);
        data.value = result.data.data;
        table.value = data.value && data.value.length > 0;
        if (!table.value) {
            error.value = null;
        }
        console.log(result);
    } catch (err) {
        if(err.response && err.response.status === 401 ){
            alert("Anda telah login di perangkat lain. Silakan logout dan login kembali.");
        }else if(err.response && err.response.data && err.response.data.pesan){
            error.value = err.response.data.pesan;
        }else{
            error.value = "Server tidak merespon atau ada masalah jaringan.";
        }
        table.value = false;
    }
};

const timer = () => {
    setTimeout(() => {
        show.value = true;
        loading.value = false;
    }, 1500);
};

onMounted(() => {
    timer();
});

onBeforeMount(() => {
    getData();
});
</script>
