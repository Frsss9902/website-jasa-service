
function WA() {
    const pesan = `Halo, saya ingin laporan mengenai kendala website.\n`
    const encodedPesan = encodeURIComponent(pesan); // Ini penting!
    const noTujuan = "6281395237757"; // Ganti dengan nomor WA perusahaan
    const url = `https://wa.me/${noTujuan}?text=${encodedPesan}`;
    
    window.open(url, "_blank");
    
}
