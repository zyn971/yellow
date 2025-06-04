// ==== TikTok Downloader ====

const form = document.getElementById('downloadForm');
const input = document.getElementById('tiktokUrl');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const url = input.value.trim();

  if (!url.includes('tiktok.com')) {
    resultDiv.innerHTML = `<p class="text-red-500">URL tidak valid. Masukkan link TikTok yang benar.</p>`;
    return;
  }

  resultDiv.innerHTML = `<p class="text-blue-500">Memproses...</p>`;

  try {
    // Ganti URL ini dengan API downloader kamu jika ada
    const api = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    const data = await res.json();

    if (data && data.video && data.video.nowm) {
      resultDiv.innerHTML = `
        <video controls class="w-full rounded">
          <source src="${data.video.nowm}" type="video/mp4" />
          Browser tidak mendukung video.
        </video>
        <a href="${data.video.nowm}" download class="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Download Video</a>
      `;
    } else {
      resultDiv.innerHTML = `<p class="text-red-500">Gagal mendapatkan video. Coba lagi.</p>`;
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p class="text-red-500">Terjadi kesalahan saat mengunduh.</p>`;
  }
});

// ==== Register Service Worker untuk PWA ====

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker terdaftar di:', reg.scope))
      .catch(err => console.error('Pendaftaran Service Worker gagal:', err));
  });
}
