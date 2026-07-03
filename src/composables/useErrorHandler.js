export function getErrorMessage(error, fallback) {
  if (!error?.response) {
    return "Server tidak merespon. Periksa koneksi Anda.";
  }
  const status = error.response.status;
  if (status === 401) return "Sesi berakhir. Silakan login ulang.";
  if (status === 404) return fallback || "Data tidak ditemukan.";
  if (status === 422) return "Data yang dikirim tidak valid.";
  if (status === 426) return "Mohon update aplikasi untuk melanjutkan.";
  if (status === 429) return "Terlalu banyak permintaan. Coba lagi nanti.";
  if (status >= 500) return "Terjadi kesalahan server. Coba lagi.";
  if (error.response.data?.pesan) return error.response.data.pesan;
  if (error.response.data?.message) return error.response.data.message;
  return fallback || "Terjadi kesalahan. Coba lagi.";
}

export function isAuthError(error) {
  return error?.response?.status === 401;
}
