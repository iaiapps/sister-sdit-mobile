<template>
    <div class="bg-img">
        <HomePage />
    </div>
</template>

<script>
import HomePage from '@/pages/HomePage.vue';

export default {
    name: 'App',
    components: {
        HomePage
    }
}
</script>

<style>
.bg-img {
    background-image: url('./assets/img/bglogin.svg');
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-x: center;
    /* background-size: 500px 430px; */
    padding-top: 12px;
}
</style>
