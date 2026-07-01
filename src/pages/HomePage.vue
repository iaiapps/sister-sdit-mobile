<template>
  <div>
    <!-- Top App Bar -->
    <div class="app-bar">
        <div class="app-bar-left">
            <div class="logo-sm"><img src="@/assets/img/logo.svg" alt="logo"></div>
            <h2>SISTER</h2>
        </div>
        <div class="app-bar-right d-flex align-items-center gap-2">
            <TimeComponent />
        </div>
    </div>

    <div class="content px-3">

      <!-- Greeting Card -->
      <div class="greeting-card">
        <p class="assalam">Assalamualaikum Wr. Wb.</p>
        <p class="name"><b>{{ props.localData.data.name }}</b></p>
        <div v-if="viewK" class="gps-info">
          <div class="gps-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span class="gps-text">Titik koordinat <strong>{{ latitude }}, {{ longitude }}</strong></span>
            <span class="gps-dist">{{ hasil }}</span>
          </div>
          <div class="radius-bar"><div class="fill"></div></div>
          <div class="radius-labels"><span>0 m</span><span>{{ props.localData.radius || 100 }} m</span></div>
        </div>
        <p v-else class="gps-loading">Mengambil titik koordinat ...</p>
      </div>

      <!-- Scan Card -->
      <div class="scan-card">
        <div class="scan-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#077944" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg></div>
        <div class="scan-text">
          <p>Scan untuk mengisi presensi</p>
          <small>Arahkan kamera ke QR Code yang tersedia</small>
        </div>
        <button class="btn-scan" v-on:click="scan()">SCAN QR</button>
      </div>

      <!-- Absence Card (Group A only) -->
      <div v-if="isGroupA" class="absence-card">
        <p class="title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#077944" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Catatan: Ijin, Sakit, atau Tugas Kedinasan, Pulang Awal</p>
        <select class="m3-select" v-model="selected">
          <option disabled value="">Pilih salah satu</option>
          <option value="Sakit">Sakit</option>
          <option value="Ijin">Ijin</option>
          <option value="Tugas kedinasan">Tugas Kedinasan</option>
          <option value="Pulang awal">Ijin Pulang Awal</option>
        </select>
        <div v-if="selected == 'Tugas kedinasan'" class="mt-2">
          <label class="form-label small">Isi keterangan tugas kedinasannya</label>
          <select class="m3-select" v-model="catatan">
            <option disabled value="">Pilih salah satu</option>
            <option>Mengerjakan tugas sekolah (4 jam efektif)</option>
            <option>Paguyuban kelas</option>
            <option>KKG</option>
            <option>Pelatihan/Workshop/Webinar</option>
            <option>Mendampingi lomba</option>
            <option>Event Sekolah/Yayasan</option>
          </select>
        </div>
        <div v-if="selected == 'Pulang awal'" class="mt-2">
          <label class="form-label small">Isi keterangan ijin pulang awal</label>
          <select class="m3-select" v-model="catatan">
            <option disabled value="">Pilih salah satu</option>
            <option>BPI di luar sekolah</option>
            <option>Sakit/Anggota Keluarga Sakit</option>
            <option>Utusan Sekolah/Tugas Kedinasan</option>
          </select>
        </div>
        <button class="btn-kirim" v-on:click="postSelectedItem">KIRIM DATA</button>
      </div>

    </div>
  </div>
</template>

<style>
.app-bar {
    background: white;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    position: sticky;
    top: 0;
    z-index: 10;
}
.app-bar-left { display: flex; align-items: center; gap: 10px; }
.logo-sm {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #077944, #0ba360);
    border-radius: 10px; padding: 7px;
}
.logo-sm img { width: 100%; height: 100%; }
.app-bar-left h2 { font-size: 18px; font-weight: 700; margin: 0; color: #1a1a2e; letter-spacing: -0.3px; }

.content { padding-top: 8px; padding-bottom: 80px; }

.greeting-card {
    background: linear-gradient(135deg, #077944, #0ba360);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 12px;
}
.greeting-card .assalam {
    font-size: 14px; color: rgba(255,255,255,0.8);
    font-weight: 400; margin-bottom: 4px;
}
.greeting-card .name {
    font-size: 18px; font-weight: 700; color: white;
    margin-bottom: 10px;
}
.greeting-card .gps-loading {
    font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 0;
}
.gps-info { }
.gps-row {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px; padding: 10px 12px;
    flex-wrap: wrap;
}
.gps-row svg { flex-shrink: 0; color: white; }
.gps-text { font-size: 12px; color: rgba(255,255,255,0.8); }
.gps-text strong { color: white; }
.gps-dist { font-size: 11px; font-weight: 600; color: #fbbf24; margin-left: auto; white-space: nowrap; }
.radius-bar { background: rgba(255,255,255,0.15); height: 4px; border-radius: 2px; margin-top: 8px; overflow: hidden; }
.radius-bar .fill { height: 100%; background: linear-gradient(90deg, #fbbf24, white); border-radius: 2px; }
.radius-labels { display: flex; justify-content: space-between; font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 3px; }

.scan-card {
    background: white; border-radius: 16px;
    padding: 16px 20px; margin-bottom: 12px;
    display: flex; align-items: center; gap: 14px;
}
.scan-icon {
    width: 48px; height: 48px;
    background: #ecfdf5; border-radius: 14px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.scan-text { flex: 1; }
.scan-text p { font-size: 14px; font-weight: 600; color: #1a1a2e; margin-bottom: 1px; }
.scan-text small { font-size: 12px; color: #64748b; }
.btn-scan {
    background: #077944; color: white; border: none;
    border-radius: 10px; padding: 12px 24px;
    font-size: 14px; font-weight: 700; white-space: nowrap;
}

.absence-card {
    background: white; border-radius: 16px;
    padding: 20px; margin-bottom: 12px;
}
.absence-card .title {
    font-size: 14px; font-weight: 600; color: #1a1a2e;
    margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
}
.absence-card .title svg { flex-shrink: 0; }
.m3-select {
    width: 100%; padding: 12px 14px;
    border: 1.5px solid #e2e8f0; border-radius: 10px;
    font-size: 14px; background: #f8fafc;
    margin-bottom: 8px; outline: none; color: #1a1a2e;
}
.m3-select:focus { border-color: #077944; background: white; }
.btn-kirim {
    background: #f59e0b; color: #1a1a2e;
    border: none; border-radius: 10px;
    padding: 12px; font-size: 14px; font-weight: 700; width: 100%;
    transition: transform 0.15s;
}
.btn-kirim:active { transform: scale(0.98); }
</style>

<script setup>
import axios from "axios";
import TimeComponent from "@/components/TimeComponent.vue";
import { ref, computed, defineProps, onMounted, onUnmounted } from "vue";

const props = defineProps({
    url: String,
    localData: Object,
});

const isGroupA = computed(() => props.localData?.group === 'A');
const selected = ref();
const catatan = ref();

const axiosDefaultHeader = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${props.localData.access_token}`;
    axios.defaults.headers.post['version'] = props.localData.version;
};

const verifyToken = async () => {
  if (props.localData.access_token) {
    try {
      axiosDefaultHeader()
      const response = await axios.get(`${props.url}/api/verify-token`);
      console.log(response)
    } catch (error) {
      console.error("Verifikasi token gagal");
      alert("Anda telah login di perangkat lain. Silakan logout dan login kembali.");
    }
  }
};

const viewK = ref(false);
const latitude =ref(0);
const longitude =ref(0);
const hasil = ref()
const isWithinScanRadius = ref(false);

const getK = () => {
  viewK.value = false;
  const onSuccess = (position) => {
    latitude.value = position.coords.latitude
    longitude.value = position.coords.longitude
    console.log(
      'Latitude: ' + position.coords.latitude + '\n' +
      'Longitude: ' + position.coords.longitude + '\n'
    );
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    const centerPoint = { lat: props.localData.latitude, lng: props.localData.longitude };
    const radius = props.localData.radius;
    const result = isWithinRadius(centerPoint, userLocation, radius);
    viewK.value = true;
    if(result.withinRadius){
      hasil.value = `${result.distance.toFixed(2)} m dari titik.`
      isWithinScanRadius.value = true;
    }else{
      hasil.value = `Luar radius: ${result.distance.toFixed(2)} m.`
      isWithinScanRadius.value = false;
    }
  };
  const onError = (error) => {
    if (error.code === 1) {
      hasil.value = 'Izin lokasi ditolak. Aktifkan GPS.';
    } else if (error.code === 2) {
      hasil.value = 'Tidak dapat menemukan lokasi. Pastikan GPS aktif.';
    } else if (error.code === 3) {
      hasil.value = 'Waktu permintaan lokasi habis. Coba lagi.';
    } else {
      hasil.value = `Kesalahan lokasi: ${error.message}`;
    }
    viewK.value = true;
    isWithinScanRadius.value = false;
    console.error('Kesalahan GPS:', error);
  };
   navigator.geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 10000,
  });
};

const toRadians = (deg) => (deg * Math.PI) / 180;

const calculateDistance = (point1, point2) => {
  const R = 6371000;
  const lat1 = toRadians(point1.lat);
  const lat2 = toRadians(point2.lat);
  const deltaLat = toRadians(point2.lat - point1.lat);
  const deltaLng = toRadians(point2.lng - point1.lng);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const isWithinRadius = (centerPoint, userLocation, radius) => {
  const distance = calculateDistance(centerPoint, userLocation);
  return { withinRadius: distance <= radius, distance };
};

const postData = () => {
    axiosDefaultHeader();
    const endpoint = isGroupA.value ? 'presence' : 'presencekaryawan';
    axios
        .post(`${props.url}/api/${endpoint}`, {
            teacher_id: props.localData.teacher_id,
        })
        .then((result) => {
            const pesan = result.data.pesan;
            alert(`${pesan}`);
        })
        .catch((error) => {
          console.log(error.response);
              if(error.response && error.response.status === 401 ){
                alert("Anda telah login di perangkat lain. Silakan logout dan login kembali.");
              }else if(error.response && error.response.data && error.response.data.pesan){
                alert(error.response.data.pesan);
              }else{
                alert("Terjadi kesalahan. Silakan coba lagi.");
              }
        });
};

const scan = () => {
  console.log(isWithinScanRadius.value);
  if (!isWithinScanRadius.value) {
    alert('Data koordinat tidak ada atau berada di luar radius scan. Pemindaian QR Code tidak diizinkan.');
    return;
  }
    const result = (result) => {
        const hasilScan = result.text;
        if (hasilScan === props.localData.qrcode) {
            postData();
        } else {
            alert("Data QR tidak sama");
        }
    };
    const err = (err) => {
        alert("scan QR: " + err);
    };
    const options = {
        preferFrontCamera: false,
        saveHistory: false,
        prompt: "Tempatkan QRCODE pada area tengah scanner",
        resultDisplayDuration: 0,
        formats: "QR_CODE,EAN_13,DATA_MATRIX",
    };
    window.cordova.plugins.barcodeScanner.scan(result, err, options);
};

const postSelectedItem = () => {
    if (!isGroupA.value) return;
    if (!selected.value) {
        alert("Catatan belum dipilih!");
        return;
    }
    if ((selected.value === "Tugas kedinasan" || selected.value === "Pulang awal") && !catatan.value) {
        alert("Silakan isi keterangan terlebih dahulu!");
        return;
    }
    axiosDefaultHeader();
    axios
        .post(`${props.url}/api/presence`, {
            teacher_id: props.localData.teacher_id,
            note: selected.value,
            description: catatan.value,
        })
        .then((result) => {
          console.log(result)
            const pesan = result.data.pesan;
            selected.value = false;
            catatan.value = '';
            alert(pesan);
        })
        .catch((error) => {
          console.log(error.response);
          if(error.response && error.response.status === 401 ){
            alert("Anda telah login di perangkat lain. Silakan logout dan login kembali.");
          }else if(error.response && error.response.data && error.response.data.pesan){
            alert(error.response.data.pesan);
          }else{
            alert("Terjadi kesalahan. Silakan coba lagi.");
          }
        });
  };

onMounted(() => {
  const onDeviceReady = () => {
    console.log("Cordova device ready.");
    verifyToken();
    getK();
  };
  const onResume = () => {
    console.log("Aplikasi dilanjutkan (resume).");
    getK();
    verifyToken();
  };
  document.addEventListener("deviceready", onDeviceReady);
  document.addEventListener("resume", onResume);
  onUnmounted(() => {
    document.removeEventListener("deviceready", onDeviceReady);
    document.removeEventListener("resume", onResume);
  });
});
</script>
