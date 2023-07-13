<template>
    <div class="container">
        <div class="bg-white text-center p-3 mt-1 shadow rounded">
            <h1 class="fs-5 my-0">REKAP DATA PRESENSI</h1>
        </div>
        <!-- <button v-on:click="cek">button</button> -->
        <div class="mt-3">
            <div class="bg-white p-3 rounded shadow mbottom table-responsive">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">Tgl</th>
                            <th scope="col">Datang</th>
                            <th scope="col">Pulang</th>
                            <th scope="col">Ket</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in data" :key="index">
                            <td>{{ new Date(item.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            })
                            }}</td>
                            <td>{{ item.time_in }}</td>
                            <td>{{ item.time_out }}</td>
                            <td>{{ item.note }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script setup>

import { ref, defineProps, defineEmits, onMounted, onBeforeMount } from 'vue';
import axios from 'axios';



const props = defineProps({
    url: String,
    localData: Object,
})

const emit = defineEmits([
    'emitLocalData'
])

const emitlocalData = () => {
    emit('emitLocalData')

}

// console.log(props.localData.data.id)

const data = ref()

const axiosDefaultHeader = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${props.localData.access_token}`;
}

const getData = () => {
    axiosDefaultHeader()
    // axios.defaults.headers.common["Authorization"] = `Bearer ${props.localData.access_token}`;
    axios.get(`${props.url}/presence/${props.localData.teacher_id}`)
        .then((result) => {
            data.value = result.data.data;
            // console.log(data.value);
        })
        .catch((error) => {
            console.log(error);
        });
}
onBeforeMount(() => {
    emitlocalData()

})

onMounted(() => {
    getData()
})
</script>