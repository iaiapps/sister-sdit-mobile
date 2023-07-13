<template>
    <div class="container">
        <div class="p-3">
            <div class="bg-white shadow p-3 rounded top">
                <div v-if="failed" class="alert alert-danger alert-dismissible fade show " role="alert">
                    <span>Email atau Password Salah !</span>
                    <button v-on:click="close" type="button" class="btn-close" data-bs-dismiss="alert"
                        aria-label="Close"></button>
                </div>
                <div class=" text-center mb-4">
                    <img src="@/assets/img/logo.svg" alt="logo" class="bg-success p-1 rounded my-3 login-logo" />
                    <h1 class="display-6 mt-1">Login Aplikasi Presensi</h1>
                    <p class="mt-1">SDIT Harapan Umat Jember</p>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="email"><i class="bi bi-envelope-fill"></i></span>
                    <input v-model="email" type="email" class="form-control" placeholder="email@example.com"
                        aria-label="email" aria-describedby="email">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="password"><i class="bi bi-key-fill"></i></span>
                    <input v-model="password" type="password" class="form-control" placeholder="********"
                        aria-label="email" aria-describedby="password">
                </div>
                <button v-on:click="login" class="btn btn-success w-100 mt-2 mb-3">
                    LOGIN
                </button>
            </div>
            <div class=" footer p-2 text-center bg-success text-white fixed-bottom">
                <small> Tim IT SDIT Harum Jember </small>
            </div>
        </div>
    </div>

</template>

<style scoped>
.login-logo {
    width: 80px;
    border-radius: 13px !important;
}

.top {
    margin-top: 70px;
}
</style>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

//props-get data from parent
const props = defineProps({
    url: String,
})

//emit
const emit = defineEmits([
    'menuEnable'
])
const menu = () => {
    emit('menuEnable', true)
}

//get link route
const router = useRouter()
const toHome = () => {
    router.push({ path: '/homepage' })
}

//login data
const email = ref();
const password = ref();


//login failed
const failed = ref();
const errorCheck = () => {
    if (failed.value == '401')
        failed.value = true
}
const close = () => {
    failed.value = false
}

//save to local
const loginData = ref();
const saveToLocal = () => {
    localStorage.setItem("localDataSave", JSON.stringify(loginData.value));
}

//function login
const login = () => {
    axios.post(`${props.url}/login`, {
        email: email.value,
        password: password.value
    }).then(response => {
        console.log('berhasil login');
        loginData.value = response.data
        saveToLocal()
        toHome()
        menu()
    }).catch(error => {
        console.log(error.response.status);
        failed.value = error.response.status
        errorCheck()
    });
}
</script>