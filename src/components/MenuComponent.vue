<template>
    <div class="bottom-nav">
        <router-link to="/homepage" class="nav-item" :class="{ active: isActive('/homepage') }">
            <i class="bi bi-house-door-fill"></i>
            <span>Home</span>
        </router-link>

        <router-link to="/presencepage" class="nav-item" :class="{ active: isActive('/presencepage') }">
            <i class="bi bi-bar-chart-line-fill"></i>
            <span>Data</span>
        </router-link>

        <router-link v-if="isGroupA" to="/apppage" class="nav-item" :class="{ active: isActive('/apppage') }">
            <i class="bi bi-grid-fill"></i>
            <span>Apps</span>
        </router-link>

        <router-link to="/infopage" class="nav-item" :class="{ active: isActive('/infopage') }">
            <i class="bi bi-info-circle-fill"></i>
            <span>Info</span>
        </router-link>

        <button v-on:click="logout" class="nav-item btn-unstyled">
            <i class="bi bi-box-arrow-right"></i>
            <span>Keluar</span>
        </button>
    </div>
</template>

<style scoped>
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    display: flex;
    padding: 6px 0 calc(6px + env(safe-area-inset-bottom));
    border-top: 1px solid #e2e8f0;
    z-index: 100;
}
.nav-item {
    flex: 1;
    text-align: center;
    padding: 6px 0;
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.15s;
}
.nav-item.active { color: #077944; }
.nav-item i { font-size: 20px; display: block; margin-bottom: 1px; }
.nav-item span { font-size: 10px; font-weight: 500; display: block; }
</style>

<script setup>
import axios from "axios";
import { computed, defineProps, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const toRoot = () => {
    router.push({ path: "/" });
};

const props = defineProps({
    url: String,
    localData: Object,
});

const isGroupA = computed(() => props.localData?.group === 'A');

const emit = defineEmits(["menuDisable"]);

const axiosDefaultheader = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${props.localData.access_token}`;
};

const deleteLocalData = () => {
    localStorage.clear();
    sessionStorage.clear();
};

const menu = () => {
    emit("menuDisable", false);
};

const logout = () => {
    if (confirm("Apakah anda yakin untuk keluar ?") == true) {
        axiosDefaultheader();
        axios.post(`${props.url}/api/logout`)
            .catch((error) => { console.log(error); });
        deleteLocalData();
        toRoot();
        menu();
    }
};

const isActive = (path) => {
    return route.path === path;
};
</script>
