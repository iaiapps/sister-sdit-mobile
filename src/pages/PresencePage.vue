<template>
  <div class="page-presence">
    <div class="page-header">
      <h1>REKAP DATA PRESENSI</h1>
    </div>

    <div class="content px-3">
      <p
        v-if="loading"
        class="bg-white p-3 mt-3 text-center border-custom-light rounded-card"
      >
        loading data...
      </p>

      <div v-if="show" class="mt-3">
        <div class="table-wrap table-responsive">
          <template v-if="table">
            <table class="table">
              <thead>
                <tr>
                  <th>Tgl</th>
                  <th>Datang</th>
                  <th>Pulang</th>
                  <th>Ket</th>
                </tr>
              </thead>
                <tbody>
                  <tr v-for="(item, index) in data" :key="index">
                    <td>
                      {{
                        new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })
                      }}
                    </td>
                    <td>{{ item.time_in }}</td>
                    <td>{{ item.time_out }}</td>
                    <td class="td-ket">
                      <span class="ket-text">{{ fullNote(item) }}</span>
                      <button
                        class="btn-ket-detail"
                        title="Lihat detail"
                        @click.stop="showDetail(item)"
                      >
                        <i class="bi bi-info-circle"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
            </table>
          </template>
          <template v-else>
            <div class="text-center p-4">
              <p v-if="error" class="m-0 text-slate">
                Terjadi kesalahan: {{ error }}
              </p>
              <p v-else class="m-0 text-slate">
                Data Presensi tidak ditemukan.
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Detail -->
  <div ref="modalEl" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detail Presensi</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="selectedItem" class="detail-list">
            <div class="detail-item">
              <span class="detail-label">Tanggal</span>
              <span class="detail-value">{{
                formatDate(selectedItem.created_at)
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Datang</span>
              <span class="detail-value">{{ selectedItem.time_in }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Pulang</span>
              <span class="detail-value">{{ selectedItem.time_out }}</span>
            </div>
            <div class="detail-item detail-item-ket">
              <span class="detail-label">Keterangan</span>
              <span class="detail-value detail-value-ket">{{
                fullNote(selectedItem)
              }}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn-modal-close"
            data-bs-dismiss="modal"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-presence {
  min-height: 100vh;
  padding-bottom: 70px;
}
.table-wrap {
  background: white;
  border-radius: var(--radius-card);
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid #e2e8f0;
}
.table-wrap::-webkit-scrollbar {
  height: 4px;
}
.table-wrap::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}
.table-wrap table {
  margin: 0;
  font-size: 13px;
}
.table-wrap th {
  background: #f8fafc;
  color: #64748b;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 10px;
  border-bottom: 1px solid #e2e8f0;
}
.table-wrap td {
  padding: 12px 10px;
  vertical-align: middle;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  white-space: nowrap;
}
.table-wrap tr:last-child td {
  border-bottom: none;
}
.td-ket {
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: 160px;
}
.td-ket .ket-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
}
.btn-ket-detail {
  background: none;
  border: none;
  color: #94a3b8;
  padding: 0;
  font-size: 14px;
  flex-shrink: 0;
  line-height: 1;
}
.btn-ket-detail:active {
  color: #077944;
}

.modal-content {
  border-radius: var(--radius-card);
  border: none;
}
.modal-header {
  border-bottom: 2px solid #077944;
  padding: 12px 16px;
}
.modal-title {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}
.modal-body {
  padding: 4px 16px;
}
.detail-list {
  display: flex;
  flex-direction: column;
}
.detail-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e2e8f0;
}
.detail-item:last-child {
  border-bottom: none;
}
.detail-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}
.detail-value {
  font-size: 13px;
  color: #1a1a2e;
  font-weight: 600;
  text-align: right;
}
.detail-item-ket {
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.detail-value-ket {
  text-align: left;
  font-weight: 400;
  line-height: 1.4;
  color: #334155;
  word-break: break-word;
  font-size: 13px;
}
.modal-footer {
  border-top: 1px solid #e2e8f0;
  padding: 10px 16px;
  justify-content: center;
}
.btn-modal-close {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--radius-control);
  padding: 6px 20px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
}
.btn-modal-close:active {
  background: #f8fafc;
  border-color: #077944;
  color: #077944;
}
</style>

<script setup>
import { ref, computed, defineProps, onBeforeMount, onMounted } from "vue";
import { Modal } from "bootstrap";
import axios from "axios";
import { getErrorMessage } from "@/composables/useErrorHandler";

const props = defineProps({
  url: String,
  localData: Object,
});

const isGroupA = computed(() => props.localData?.group === "A");
const loading = ref(true);
const show = ref(false);
const data = ref([]);
const error = ref(null);
const table = ref(false);
const modalEl = ref(null);
const selectedItem = ref(null);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const fullNote = (item) => {
  return item.note + (item.description?.trim() ? ": " + item.description : "");
};

const showDetail = (item) => {
  selectedItem.value = item;
  const modal = Modal.getOrCreateInstance(modalEl.value);
  modal.show();
};

const axiosDefaultHeader = () => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${props.localData.access_token}`;
  axios.defaults.headers.get["version"] = props.localData.version;
};

const getData = async () => {
  if (!props.localData?.teacher_id) return;
  axiosDefaultHeader();
  try {
    const endpoint = isGroupA.value ? "presence" : "presencekaryawan";
    const result = await axios.get(
      `${props.url}/api/${endpoint}/${props.localData.teacher_id}`,
    );
    data.value = result.data.data;
    table.value = data.value && data.value.length > 0;
    if (!table.value) {
      error.value = null;
    }
    console.log(result);
  } catch (err) {
    if (err.response?.status === 401) {
      alert(
        "Anda telah login di perangkat lain. Silakan logout dan login kembali.",
      );
    } else {
      error.value = getErrorMessage(err);
    }
    table.value = false;
  }
};

const timer = () => {
  setTimeout(() => {
    show.value = true;
    loading.value = false;
  }, 1500);
};

onMounted(() => {
  timer();
});

onBeforeMount(() => {
  getData();
});
</script>
