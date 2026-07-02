<template>
  <div class="d-flex align-items-center gap-2">
    <div class="text-end">
      <div class="fw-bold time-text">
        {{ timeNow }}
      </div>
      <div class="date-text">
        {{ dateNow }}
      </div>
    </div>
    <div
      v-if="status"
      class="status-online d-flex align-items-center gap-1"
    >
      <span class="dot dot-online"></span>
    </div>
    <div v-else class="status-offline">
      <span class="dot dot-offline"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const timeNow = ref();
const dateNow = ref();
const status = ref();

const time = () => {
  let jam = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  let hari = new Date().toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  timeNow.value = jam;
  dateNow.value = hari;
};
time();

const check = () => {
  status.value = navigator.onLine;
  window.addEventListener("online", () => {
    status.value = true;
  });
  window.addEventListener("offline", () => {
    status.value = false;
  });
};
check();
</script>

<style scoped>
.time-text {
  font-size: 16px;
  line-height: 1.2;
}

.date-text {
  font-size: 13px;
  color: var(--on-surface-variant, #64748b);
  line-height: 1.2;
}

.status-online {
  color: #077944;
  font-size: 13px;
  font-weight: 600;
}

.status-offline {
  color: #dc2626;
  font-size: 13px;
  font-weight: 600;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

.dot-online {
  background: #077944;
}

.dot-offline {
  background: #dc2626;
}
</style>
