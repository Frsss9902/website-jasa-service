document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDesc');
  const closeModalBtn = document.getElementById('closeModal');

  // Fungsi buka modal
  window.openModal = function(imageSrc, description) {
    modalImage.src = imageSrc;
    modalDesc.innerText = description;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  // Tutup modal saat klik tombol close
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  });

  // Tutup modal saat klik luar konten
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }
  });
});
