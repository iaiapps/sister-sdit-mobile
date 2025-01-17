<template>
    <TimeComponent />
    <img
        src="@/assets/img/logo.svg"
        alt="logo"
        class="bg-success p-1 mt-2 logo-app"
    />

    <div class="bg-white text-center p-3 top shadow rounded">
        <p class="my-1 mt-4">Assalamualaikum Wr. Wb.</p>
        <p class="fs-5 mb-1">
            <b>{{ props.localData.data.name }}</b>
        </p>
    </div>

    <div class="bg-white mt-3 text-center p-3 rounded shadow">
        <p class="fs-5">Scan untuk mengisi presensi</p>
        <button class="btn btn-success btn-lg mt-1" v-on:click="scan()">
            SCAN QR
        </button>
    </div>

    <div class="bg-white mt-3 text-center p-3 rounded shadow">
        <p class="fs-5">
            Catatan: Ijin, Sakit, atau Tugas Kedinasan, Pulang Awal
        </p>
        <div class="mb-3">
            <select class="form-select" v-model="selected">
                <option disabled value="">Pilih salah satu</option>
                <option value="Sakit">Sakit</option>
                <option value="Ijin">Ijin</option>
                <option value="Tugas kedinasan">Tugas Kedinasan</option>
                <option value="Pulang awal">Ijin Pulang Awal</option>
            </select>

            <div v-if="selected == 'Tugas kedinasan'" class="mt-3">
                <label for="kedinasan" class="form-label"
                    >Isi keterangan tugas kedinasannya</label
                >

                <select class="form-select" v-model="catatan">
                    <option disabled value="">Pilih salah satu</option>
                    <option>Mengerjakan tugas sekolah (4 jam efektif)</option>
                    <option>Paguyuban kelas</option>
                    <option>KKG</option>
                    <option>Pelatihan</option>
                    <option>Mendampingi lomba</option>
                    <option>Event Sekolah</option>
                </select>

                <!-- <input
                    v-model="catatan"
                    id="kedinasan"
                    type="text"
                    class="form-control"
                /> -->
            </div>
            <div v-if="selected == 'Pulang awal'" class="mt-3">
                <label for="p_awal" class="form-label"
                    >Isi keterangan ijin pulang awal</label
                >
                <!-- <input
                    v-model="catatan"
                    id="p_awal"
                    type="text"
                    class="form-control"
                /> -->
                <select class="form-select" v-model="catatan">
                    <option disabled value="">Pilih salah satu</option>
                    <option>BPI di luar sekolah</option>
                    <option>Sakit/Anggota Keluarga Sakit</option>
                    <option>Utusan Sekolah/Tugas Kedinasan</option>
                </select>
            </div>
        </div>
        <button class="btn btn-success" v-on:click="postSelectedItem()">
            KIRIM DATA
        </button>
    </div>
    <!-- <div class="mt-5">
        <button v-on:click="getLocation()">Try Geolocation</button>
    </div> -->
</template>

<style>
.logo-app {
    position: absolute;
    z-index: 9;
    left: 0;
    right: 0;
    width: 70px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 13px;
}

.top {
    margin-top: 50px !important;
}
</style>

<script setup>
import axios from "axios";
import TimeComponent from "@/components/TimeComponent.vue";
import { ref, defineProps } from "vue";

const props = defineProps({
    url: String,
    localData: Object,
});

const selected = ref();
const catatan = ref();

const axiosDefaultHeader = () => {
    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${props.localData.access_token}`;
};

// post data scan
const postData = () => {
    axiosDefaultHeader();
    axios
        .post(`${props.url}/api/presence`, {
            teacher_id: props.localData.teacher_id,
        })
        .then((result) => {
            const pesan = result.data.pesan;
            alert(`${pesan}`);
        })
        .catch((err) => {
            const pesan = err.response.data.pesan;
            alert(`${pesan}`);
        });
};

// const scan = () => {
//     const result = (result) => {
//         const hasilScan = result.text;
//         if (hasilScan === props.localData.qrcode) {
//             postData();
//         } else {
//             alert("Data QR tidak sama");
//         }
//     };
//     const err = (err) => {
//         alert("scan QR: " + err);
//     };
//     const options = {
//         preferFrontCamera: false,
//         saveHistory: false,
//         prompt: "Tempatkan QRCODE pada area tengah scanner",
//         resultDisplayDuration: 0,
//         formats: "QR_CODE,EAN_13,DATA_MATRIX",
//     };
//     window.cordova.plugins.barcodeScanner.scan(result, err, options);
// };


// Titik pusat lokasi dan radius yang diizinkan
const centerPoint = { lat: props.localData.latitude, lng: props.localData.longitude }; // Latitude dan Longitude pusat
const radius = ref(props.localData.radius).value; // Radius dalam meter

// Fungsi untuk mengonversi derajat ke radian
const toRadians = (deg) => (deg * Math.PI) / 180;

// Fungsi untuk menghitung jarak menggunakan rumus Haversine
const calculateDistance = (point1, point2) => {
  const R = 6371000; // Radius bumi dalam meter
  const lat1 = toRadians(point1.lat);
  const lat2 = toRadians(point2.lat);
  const deltaLat = toRadians(point2.lat - point1.lat);
  const deltaLng = toRadians(point2.lng - point1.lng);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Hasil dalam meter
};

// Fungsi untuk mendapatkan lokasi pengguna
const getUserLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

// Fungsi untuk memeriksa apakah pengguna berada dalam radius
const isWithinRadius = async (centerPoint, radius) => {
  try {
    const position = await getUserLocation();
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    const distance = calculateDistance(centerPoint, userLocation);
    return { withinRadius: distance <= radius, distance };
  } catch {
    throw new Error("Gagal mendapatkan lokasi. Pastikan GPS aktif.");
  }
};

// Fungsi utama untuk memvalidasi lokasi dan memulai proses scan QR code
const scan = async (props) => {
  try {
    // Validasi lokasi
    const { withinRadius, distance } = await isWithinRadius(centerPoint, radius);

    if (!withinRadius) {
      alert(
        `Anda berada di luar radius. Jarak: ${distance.toFixed(
          2
        )} meter dari lokasi yang diizinkan.`
      );
      return;
    }

    // Lanjutkan ke proses scan QR code
    window.cordova.plugins.barcodeScanner.scan(
      (result) => {
        if (result.text === props.localData.qrcode) {
          postData(); // Panggil fungsi untuk mengirim data
        } else {
          alert("Data QR tidak sesuai.");
        }
      },
      (err) => {
        alert("Terjadi kesalahan saat scan QR: " + err);
      },
      {
        preferFrontCamera: false,
        saveHistory: false,
        prompt: "Tempatkan QR Code di dalam area pemindai",
        resultDisplayDuration: 0,
        formats: "QR_CODE,EAN_13,DATA_MATRIX",
      }
    );
  } catch (error) {
    alert(error.message);
  }
};


// post data dengan note
const postSelectedItem = () => {
    if (selected.value == null || selected.value == " ") {
        alert("catatan belum dipilih !");
    } else {
        axiosDefaultHeader();
        axios
            .post(`${props.url}/api/presence`, {
                teacher_id: props.localData.teacher_id,
                note: selected.value,
                description: catatan.value,
            })
            .then((result) => {
                const pesan = result.data.pesan;
                selected.value = false;
                alert(pesan);
            })
            .catch((error) => {
                console.log(error);
                // alert(error.response.data);
            });
    }
};  


// // geolocation
// const getLocation = ()=>{
//      // onSuccess Callback
//     const onSuccess = (position)=> {
//        console.log('Latitude: '+ position.coords.latitude + '\n' +
//               'Longitude: '+ position.coords.longitude + '\n' )
//     };

//     // onError Callback receives a PositionError object
//     const onError = (error)=> {
//         console.log('code: '+ error.code + '\n' +
//               'message: '+ error.message + '\n');
//     }
   
//     navigator.geolocation.getCurrentPosition(onSuccess, onError);
// }
</script>
