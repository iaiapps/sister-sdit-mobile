<template>
    <div class="login-page">
        <div class="login-header">
            <div class="logo-wrap"><img src="@/assets/img/logo.svg" alt="logo"></div>
            <h1>SISTER SDIT</h1>
            <p>Presensi & Informasi<br>SDIT Harapan Umat Jember</p>
        </div>
        <div class="login-body">
            <div v-if="failed" class="alert alert-danger alert-dismissible fade show py-2" role="alert">
                <small>{{ msg }}</small>
                <button v-on:click="close" type="button" class="btn-close py-2" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <label class="form-label">Email</label>
            <div class="input-wrap">
                <i class="bi bi-envelope"></i>
                <input v-model="email" type="email" placeholder="email@email.com">
            </div>
            <label class="form-label">Password</label>
            <div class="input-wrap">
                <i class="bi bi-lock"></i>
                <input v-if="showPassword" type="text" v-model="password">
                <input v-else v-model="password" type="password" placeholder="********">
                <span class="toggle-eye" v-on:click="toggleShow">
                    <i class="bi" :class="{'bi-eye-slash-fill': showPassword, 'bi-eye-fill': !showPassword}"></i>
                </span>
            </div>
            <button v-on:click="login" class="btn-login">MASUK</button>
            <div class="login-version"><VersionComponent/></div>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    background: #f5f7fa;
    display: flex;
    flex-direction: column;
}
.login-header {
    background: linear-gradient(135deg, #077944, #0ba360);
    padding: 48px 28px 36px;
    text-align: center;
}
.logo-wrap {
    width: 80px;
    height: 80px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 20px;
    padding: 14px;
    margin: 0 auto 16px;
}
.logo-wrap img { width: 100%; height: 100%; }
.login-header h1 {
    font-size: 26px;
    font-weight: 800;
    color: white;
    letter-spacing: -0.3px;
    margin-bottom: 4px;
}
.login-header p {
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    margin-bottom: 0;
    line-height: 1.4;
}
.login-body {
    padding: 24px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
}
.form-label {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 6px;
    display: block;
}
.input-wrap {
    background: white;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    transition: border-color 0.2s;
}
.input-wrap:focus-within { border-color: #077944; }
.input-wrap input {
    background: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    padding: 14px 0;
    width: 100%;
    color: #1a1a2e;
}
.input-wrap input::placeholder { color: #94a3b8; }
.input-wrap i { color: #94a3b8; font-size: 18px; margin-right: 10px; }
.toggle-eye { color: #94a3b8; cursor: pointer; padding: 8px; margin-right: -8px; }
.btn-login {
    background: #077944;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px;
    font-size: 16px;
    font-weight: 700;
    width: 100%;
    margin-top: auto;
    transition: transform 0.15s;
}
.btn-login:active { transform: scale(0.98); }
.login-version {
    text-align: center;
    margin-top: 16px;
    color: #94a3b8;
    font-size: 12px;
}
</style>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import VersionComponent from "@/components/VersionComponent.vue";

const showPassword = ref();
const toggleShow = () => {
    showPassword.value = !showPassword.value;
};

const props = defineProps({
    url: String,
});

const emit = defineEmits(["menuEnable"]);
const menu = () => {
    emit("menuEnable", true);
};

const router = useRouter();
const toHome = () => {
    router.go({ path: "/homepage" });
};

const email = ref();
const password = ref();

const failed = ref(false);
const msg = ref();
const errorCheck = () => {
    const status = failed.value;
    if (status === 401) {
        failed.value = true;
        msg.value = "Email atau Password Salah !";
    } else if (status === 0 || status === undefined || status === null) {
        failed.value = true;
        msg.value = "Server atau Jaringan Bermasalah , Hubungi Admin !";
    } else {
        failed.value = true;
        msg.value = "Terjadi kesalahan (" + status + "). Hubungi Admin !";
    }
};
const close = () => {
    failed.value = false;
};

const loginData = ref();
const saveToLocal = () => {
    localStorage.setItem("localDataSave", JSON.stringify(loginData.value));
};

const login = () => {
    axios.defaults.timeout = 15000;
    axios
        .post(`${props.url}/api/login`, {
            email: email.value,
            password: password.value,
            crossDomain: true,
        })
        .then((response) => {
            console.log("berhasil login");
            loginData.value = response.data;
            saveToLocal();
            toHome();
            menu();
        })
        .catch((error) => {
            failed.value = error.request.status;
            errorCheck();
        });
};
</script>
