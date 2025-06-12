const header = document.getElementById('mainHeader');
let lastMouseY = null;

document.addEventListener('mousemove', function (e) {
  if (lastMouseY !== null) {
    if (e.clientY > lastMouseY + 10) {
      // Gerak ke bawah → sembunyikan header
      header.style.transform = 'translateY(-100%)';
    } else if (e.clientY < lastMouseY - 10) {
      // Gerak ke atas → tampilkan header
      header.style.transform = 'translateY(0)';
    }
  }
  lastMouseY = e.clientY;
});
