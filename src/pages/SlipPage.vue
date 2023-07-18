<template>
    <div class="container">
        <div class="bg-white text-center p-3 shadow rounded">
            <h1 class="fs-5 my-0">REKAP SLIP GAJI</h1>
        </div>
        <div class="bg-white text-center p-3 shadow rounded mt-3">
            <label for="date" class="form-label">Pilih Bulan & Tahun </label>
            <div class="row">
                <div class="col-8">
                    <input v-model="date" type="date" name="date" id="date" class="form-control">
                </div>
                <div class="col-4">
                    <button v-on:click="getData" type="submit" class="btn btn-success w-100">submit</button>
                </div>
            </div>
        </div>

        <div v-if="show" class="bg-white mt-3 p-3 shadow table-responsive rounded">
            <div id="printarea">
                <div class="text-center">
                    <img src="@/assets/img/kop.svg" class="kop mb-2" alt="kop">
                    <p class="fs-4 fw-bold m-0">SLIP GAJI SDIT HARUM</p>
                    <p class="mb-2">Bulan : {{ data ? new Date(data.bulan).toLocaleDateString("id-ID", {
                            month: "long",
                            year: "numeric",
                        }) : ''
                    }} </p>
                </div>

                <hr class="mt-0">

                <table class="table table-sm align-middle">
                    <tbody>
                        <tr>
                            <td class="twidth">Nomor</td>
                            <td>: {{ data ? data.nomor_slip : '' }} </td>
                        </tr>
                        <tr>
                            <td class="twidth">Nama</td>
                            <td>: {{ name }} </td>
                        </tr>
                        <tr>
                            <td class="twidth">Jabatan</td>
                            <td>: {{ data ? data.jabatan : '' }} </td>
                        </tr>
                        <tr>
                            <td class="twidth">kehadiran</td>
                            <td>: {{ data ? data.hadir : '' }} </td>
                        </tr>
                        <tr>
                            <td class="twidth">Tepat</td>
                            <td>: {{ data ? data.tepat : '' }} </td>
                        </tr>
                        <tr>
                            <td class="twidth">Terlambat</td>
                            <td>: {{ data ? data.telat : '' }} </td>
                        </tr>
                    </tbody>
                </table>

                <hr>
                <div id="table">
                    <table class="table table-sm align-middle">
                        <span class="fw-bold">A. Penghasilan</span>
                        <tbody>
                            <tr>

                                <td class="text-start">Gaji Pokok</td>
                                <td class="text-end">{{ data ? data.gaji_pokok : '' }} </td>
                            </tr>
                            <tr>

                                <td>Gaji Fungsional</td>
                                <td class="text-end">{{ data ? data.gaji_fungsional : '' }} </td>
                            </tr>
                            <tr>

                                <td>Kehadiran</td>
                                <td class="text-end">{{ data ? data.tot_fee_kehadiran : '' }}</td>
                            </tr>

                        </tbody>
                    </table>

                    <table class="table table-sm align-middle">
                        <span class="fw-bold">B. Penambahan</span>
                        <tbody>
                            <tr>

                                <td>Ekskul</td>
                                <td class="text-end">{{ data ? data.ekskul : '' }}</td>
                            </tr>
                            <tr>

                                <td>Istri & Anak</td>
                                <td class="text-end">{{ data ? data.istri_anak : '' }}</td>
                            </tr>
                            <tr>

                                <td>Sukses UN/Khotib</td>
                                <td class="text-end">{{ data ? data.sukses_un_khotib : '' }}</td>
                            </tr>
                            <tr>

                                <td>Fee</td>
                                <td class="text-end">{{ data ? data.fee : '' }}</td>
                            </tr>
                            <tr>

                                <td>Hari Raya</td>
                                <td class="text-end">{{ data ? data.hari_raya : '' }}</td>
                            </tr>

                        </tbody>
                    </table>

                    <table class="table table-sm align-middle">
                        <span class="fw-bold">C. Pengurangan</span>
                        <tbody>
                            <tr>

                                <td>DPP</td>
                                <td class="text-end">{{ data ? data.dpp : '' }}</td>
                            </tr>
                            <tr>

                                <td>Koperasi</td>
                                <td class="text-end">{{ data ? data.koperasi : '' }}</td>
                            </tr>
                            <tr>

                                <td>Peminjaman</td>
                                <td class="text-end">{{ data ? data.peminjaman : '' }}</td>
                            </tr>
                            <tr>

                                <td>Dansos</td>
                                <td class="text-end">{{ data ? data.dansos : '' }}</td>
                            </tr>
                            <tr>

                                <td>BPJS</td>
                                <td class="text-end">{{ data ? data.bpjs : '' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr class="mt-0">

                <div class="row ">
                    <div class="col-12 col-md-6">
                        <table class="table table-sm align-middle">
                            <span class="fw-bold">D. Rekapitulasi</span>
                            <tbody>
                                <tr>
                                    <td>Penghasilan</td>
                                    <td class="text-end">{{ data ? data.komponen_a : '' }}</td>
                                </tr>
                                <tr>
                                    <td>Penambahan</td>
                                    <td class="text-end">{{ data ? data.komponen_b : '' }}</td>
                                </tr>
                                <tr>
                                    <td>Pengurangan</td>
                                    <td class="text-end">{{ data ? data.komponen_c : '' }}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold">Gaji yang diterima</td>
                                    <td class="fs-5 text-end fw-bold">{{ data ? new Intl.NumberFormat("id-ID", {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                        }).format(data.total) : ''
                                    }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="boxttd mt-2 text-center position-relative clearfix">
                            <p>Jember, {{ data ? new Date(data.bulan).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }) : ''
                            }} </p>
                            <div class="imgttd">
                                <img src="@/assets/img/stam.png" alt="stempel" class="stamp" />
                            </div>
                            <p class="mt-5 fw-bold">Bendahara SDIT Harum</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="p-3 bg-white text-center mt-3 rounded shadow">
            <p class="fs-5 m-0">Data slip gaji belum tersedia</p>
        </div>
    </div>
</template>

<style scoped>
.twidth {
    width: 80px;
}

.kop {
    width: 280px;
    margin-left: auto;
    margin-right: auto;
}

.imgttd {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
}

.stamp {
    width: 85px;
}
</style>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
    url: String,
    localData: Object,
})

// const curency = new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
// });

const name = ref(props.localData.data.name)
const date = ref()

/// const date = new Date().toISOString().split('T')[0]

const show = ref()
const data = ref()

const checkShow = () => {
    if (data.value == null) {
        show.value = false
    } else {
        show.value = true
    }
}

const axiosDefaultHeader = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${props.localData.access_token}`;
}

const getData = () => {
    axiosDefaultHeader()
    // axios.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
    axios.get(`${props.url}/salary/${props.localData.teacher_id}?date=${date.value}`)
        .then((result) => {
            data.value = result.data.data;
            // console.log(data.value);
            checkShow()
        })
        .catch((error) => {
            console.log(error.response.statusText);
            show.value = false
        });
}

onMounted(() => {
    checkShow();
    // getData();
})

</script>