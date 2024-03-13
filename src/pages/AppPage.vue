<template>
    <div class="container">
        <div class="bg-white text-center p-3 mt-1 shadow rounded">
            <h1 class="fs-5 my-0">Menu Lain</h1>
        </div>

        <div class="row mt-1 gy-3 gx-3">

            <!-- presensi manual -->
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <i class="bi bi-calendar-check display-3"></i>
                            <p class="mt-3 mb-0 ">Presensi Manual</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-success w-100" data-bs-toggle="modal"
                            data-bs-target="#modalshow" v-on:click="pilih"> pilih
                        </button>
                    </div>
                </div>
            </div>

            <!-- mutabaah -->
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <i class="bi bi-list-check display-3"></i>
                            <p class="mt-3 mb-0 ">Mutabaah</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success w-100" v-on:click="openIna('mutabaah')">pilih</button>
                    </div>
                </div>
            </div>

            <!-- bpi -->
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <i class="bi bi-bar-chart display-3"></i>
                            <p class="mt-3 mb-0 ">BPI</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success w-100" v-on:click="openIna('bpi')">pilih</button>
                    </div>
                </div>
            </div>

            <!-- guru pengganti -->
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center">
                            <i class="bi bi-people display-3"></i>
                            <p class="mt-3 mb-0 ">Guru Pengganti</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success w-100" v-on:click="openIna('pengganti')">pilih</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal -->
        <div class="modal fade " id="modalshow" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="1"
            aria-hidden="true">
            <div class="modal-dialog vh-100 m-0 p-2">
                <div class="modal-content height">
                    <div class="modal-header py-1">
                        <h1 class="modal-title fs-5">{{ title }}</h1>
                        <div>
                            <button v-on:click="refresh" class="btn fs-4">
                                <i class="bi bi-arrow-clockwise"></i></button>
                            <button type="button" class="btn fs-4" data-bs-dismiss="modal">
                                <i class="bi bi-x-circle"></i></button>
                        </div>
                    </div>
                    <div class="modal-body ">
                        <iframe v-if="show" class="iframee holds-the-iframe" v-bind:src="url" title="Presensi manual">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.height {
    height: 100%;
}

.iframee {
    width: 100%;
    height: 100%
}

.holds-the-iframe {
    background-size: 300px;
    background-image: url(@/assets/img/loader.gif);
    background-repeat: no-repeat;
    background-position: center center;
}
</style>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    url: String,
})

const show = ref(true)

const timer = () => {
    setTimeout(() => {
        show.value = true
    }, 500);
}

const refresh = () => {
    show.value = false
    timer()
}

const url = ref('')
const title = ref('')
const pilih = () => {
    title.value = 'Presensi Manual'
    url.value = "https://docs.google.com/forms/d/e/1FAIpQLSdh_4CaFf3IxgE-Nz6XYeHCD-RCrRAMecTmR9EuZiSySJTAcw/viewform?usp=sf_link"

}


// inappbrowser
const openIna = (e) => {
    const link = ref('');
    if (e == 'mutabaah') {
        link.value = `${props.url}/mutabaah-mobile`;
    } else if (e == 'bpi') {
        link.value = `${props.url}/bpi-mobile`;
    } else if (e == 'pengganti') {
        link.value = `${props.url}/pengganti-mobile`;
    }

    const target = '_blank'
    const options = 'location=no,zoom=no,clearcache=no,clearsessioncache=no'

    const loadStopCallBack = () => {
        //insert css
        ina.insertCSS({
            code: "body{margin-top:70px}\
                    .header{z-index:99;position:fixed;top:0;right:0;left:0;display:flex;justify-content:space-between;padding:8px 15px;height:55px;}\
                    .p2{font-size:18px;margin-bottom:0px;padding-top:8px; }"
        });
        // insert message "close"
        ina.executeScript({
            code: " var message = 'close';\
                    var messageObj = {action: message};\
                    var stringifiedMessageObj = JSON.stringify(messageObj);\
                    function closee(){webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);}"
        });
        //insert header + button + script time
        ina.executeScript({
            code: "(function()\
                   {var body=document.querySelector('body');\
                   var div=document.createElement('div');\
                   div.classList.add('header');\
                   div.classList.add('bg-light');\
                   var button=document.createElement('button');\
                   button.setAttribute('id','button');\
                   button.innerHTML='close';\
                   div.appendChild(button);\
                   button.addEventListener('click',()=>{window.closee()});\
                   button.classList.add('btn');\
                   button.classList.add('btn-success');\
                   var p2=document.createElement('p');\
                   div.appendChild(p2);\
                   p2.innerHTML='Isi Data';\
                   p2.classList.add('p2');\
                   var buttonR = document.createElement('button');\
                   buttonR.setAttribute('id','buttonR');\
                   buttonR.innerHTML='refresh';\
                   div.appendChild(buttonR);\
                   buttonR.addEventListener('click',()=>{window.location.reload()});\
                   buttonR.classList.add('btn');\
                   buttonR.classList.add('btn-success');\
                   body.appendChild(div)})()"
        });
        ina.show();
    }
    const messageCallBack = (params) => {
        if (params.data.action == 'close') {
            ina.close();
        }
    }
    let ina = window.cordova.InAppBrowser.open(link.value, target, options);
    ina.addEventListener('loadstop', loadStopCallBack);
    ina.addEventListener('message', messageCallBack);
}
</script>
