<template>
    <div class="bg-white text-center p-3 mt-1 shadow rounded">
        <h1 class="fs-5 my-0">REKAP DATA PRESENSI</h1>
    </div>

    <p v-if="loading" class="bg-white p-3 mt-3 text-center rounded">
        <span>loading data...</span>
    </p>

    <div v-if="show" class="mt-3">
        <div class="bg-white p-3 rounded shadow table-responsive">
            <table v-if="table" class="table">
                <thead>
                    <tr class="text-center">
                        <th scope="col">Tgl</th>
                        <th scope="col">Datang</th>
                        <th scope="col">Pulang</th>
                        <th scope="col">Ket</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in data" :key="index">
                        <td class="text-center">
                            {{
                                new Date(item.created_at).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                    }
                                )
                            }}
                        </td>
                        <td class="text-center">{{ item.time_in }}</td>
                        <td class="text-center">{{ item.time_out }}</td>
                        <td class="text-start">
                            {{
                                item.note +
                                " " +
                                (item.description == null ||
                                item.description == " "
                                    ? " "
                                    : ": " + item.description)
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <div v-else-if="table == null">
                Belum ada data presensi
            </div> -->
            <div v-else class="text-center">
               Data Presensi belum ada atau Server dan Jaringan Bermasalah, Hubungi Admin !
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onBeforeMount, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
    url: String,
    localData: Object,
});

const loading = ref(true);
const show = ref();
const data = ref();
// const err = ref();
const table = ref();

const axiosDefaultHeader = () => {
    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${props.localData.access_token}`;
};

const getData = () => {
    axiosDefaultHeader();
    axios
        .get(`${props.url}/api/presence/${props.localData.teacher_id}`)
        .then((result) => {
            data.value = result.data.data;
            table.value = true;
            console.log(data.value); 
            // show.value = true;
            // console.log(data.value);
        })
        .catch((error) => {
            console.log(error);
            // show.value = false;
            // err.value = true;
        });
};

const timer = () => {
    setTimeout(() => {
        show.value = true;
        loading.value = false;
    }, 2000);
};

onMounted(() => {
    timer();
});

onBeforeMount(() => {
    getData();
});
</script>
