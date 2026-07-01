<template>
    <div class="page-apps">
        <div class="page-header">
            <h1>Menu Lain</h1>
        </div>

        <div class="content px-3">
            <div class="row g-2">
                <!-- presensi manual -->
                <div class="col-6">
                    <div class="app-card">
                        <div class="body">
                            <i class="bi bi-calendar-check"></i>
                            <p>Presensi<br>Manual</p>
                        </div>
                        <div class="foot">
                            <button type="button" class="btn-pilih" data-bs-toggle="modal" data-bs-target="#modalshow" v-on:click="pilih">pilih</button>
                        </div>
                    </div>
                </div>

                <!-- mutabaah -->
                <div class="col-6">
                    <div class="app-card">
                        <div class="body">
                            <i class="bi bi-list-check"></i>
                            <p>Mutabaah<br>Bulanan</p>
                        </div>
                        <div class="foot">
                            <button class="btn-pilih" v-on:click="openIna('mutabaah')">pilih</button>
                        </div>
                    </div>
                </div>

                <!-- bpi -->
                <div class="col-6">
                    <div class="app-card">
                        <div class="body">
                            <i class="bi bi-bar-chart"></i>
                            <p>Bina Pribadi<br>Islami (BPI)</p>
                        </div>
                        <div class="foot">
                            <button class="btn-pilih" v-on:click="openIna('bpi')">pilih</button>
                        </div>
                    </div>
                </div>

                <!-- guru pengganti -->
                <div class="col-6">
                    <div class="app-card">
                        <div class="body">
                            <i class="bi bi-people"></i>
                            <p>Guru<br>Pengganti</p>
                        </div>
                        <div class="foot">
                            <button class="btn-pilih" v-on:click="openIna('pengganti')">pilih</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal -->
        <div class="modal fade" id="modalshow" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="1" aria-hidden="true">
            <div class="modal-dialog vh-100 m-0 p-2">
                <div class="modal-content height">
                    <div class="modal-header py-1">
                        <h1 class="modal-title fs-5">{{ title }}</h1>
                        <div>
                            <button v-on:click="refresh" class="btn fs-4"><i class="bi bi-arrow-clockwise"></i></button>
                            <button type="button" class="btn fs-4 float-end" data-bs-dismiss="modal"><i class="bi bi-x-circle"></i></button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <iframe v-if="show" class="iframee holds-the-iframe" v-bind:src="url" title="Presensi manual"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-apps { min-height: 100vh; background: #f0f2f5; padding-bottom: 70px; }
.page-header {
    background: white;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
}
.page-header h1 {
    font-size: 16px; font-weight: 700; margin: 0;
    color: #1a1a2e; text-align: center;
}
.content { padding-top: 12px; }
.app-card {
    background: white; border-radius: 14px;
    overflow: hidden; border: 1px solid #e2e8f0;
    transition: transform 0.15s;
}
.app-card:active { transform: translateY(-1px); }
.app-card .body {
    padding: 24px 12px 10px;
    text-align: center;
}
.app-card .body i { font-size: 2rem; display: block; margin-bottom: 8px; color: #077944; }
.app-card .body p { font-size: 12px; font-weight: 600; color: #1a1a2e; margin-bottom: 0; line-height: 1.4; }
.app-card .foot { padding: 0 12px 14px; }
.btn-pilih {
    background: #077944; color: white; border: none;
    border-radius: 8px; padding: 8px 14px;
    font-size: 12px; font-weight: 600; width: 100%;
}
.height { height: 100%; }
.iframee { width: 100%; height: 100%; }
.holds-the-iframe {
    background-size: 300px;
    background-image: url(@/assets/img/loader.gif);
    background-repeat: no-repeat;
    background-position: center center;
}
</style>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
    url: String,
    localData: Object,
});

const show = ref(true);

const timer = () => {
    setTimeout(() => {
        show.value = true;
    }, 500);
};

const refresh = () => {
    show.value = false;
    timer();
};

const url = ref("");
const title = ref("");
const pilih = () => {
    title.value = "Presensi Manual";
    url.value = "https://docs.google.com/forms/d/e/1FAIpQLSdh_4CaFf3IxgE-Nz6XYeHCD-RCrRAMecTmR9EuZiSySJTAcw/viewform?usp=sf_link";
};

const openIna = (e) => {
    const link = ref("");
    const tokenParam = `token=${props.localData?.access_token}`;
    if (e == "mutabaah") {
        link.value = `${props.url}/mutabaah-mobile?${tokenParam}`;
    } else if (e == "bpi") {
        link.value = `${props.url}/bpi-mobile?${tokenParam}`;
    } else if (e == "pengganti") {
        link.value = `${props.url}/pengganti-mobile?${tokenParam}`;
    }

    const target = "_blank";
    const options = "location=no,zoom=no,clearcache=no,clearsessioncache=no";
    
    const loadStopCallBack = () => {
        ina.insertCSS({
            code: "body{margin-top:70px}\
                    .header{z-index:99;position:fixed;top:0;right:0;left:0;display:flex;justify-content:space-between;padding:8px 15px;height:55px;}\
                    .p2{font-size:18px;margin-bottom:0px;padding-top:8px; }",
        });
        ina.executeScript({
            code: " var message = 'close';\
                    var messageObj = {action: message};\
                    var stringifiedMessageObj = JSON.stringify(messageObj);\
                    function closee(){webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);}",
        });
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
                   body.appendChild(div)})()",
        });
        ina.show();
    };
    const messageCallBack = (params) => {
        if (params.data.action == "close") {
            ina.close();
        }
    };
    let ina = window.cordova.InAppBrowser.open(link.value, target, options);
    ina.addEventListener("loadstop", loadStopCallBack);
    ina.addEventListener("message", messageCallBack);
};
</script>
