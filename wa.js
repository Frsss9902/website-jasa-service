document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const nohp = document.getElementById("nohp").value;
  const barang = document.getElementById("barang").value;
  const layanan = document.getElementById("layanan").value;
  const alamat = document.getElementById("alamat").value;
  const keluhan = document.getElementById("keluhan").value;

  const formData = { nama, nohp, barang, layanan, alamat, keluhan };
  localStorage.setItem('formServis', JSON.stringify(formData));

  const pesan = `Halo, saya ingin melakukan layanan.\n
Nama: ${nama}
No HP: ${nohp}
Barang: ${barang}
Layanan: ${layanan}
Alamat: ${alamat}
Keluhan: ${keluhan}`;

  const encodedPesan = encodeURIComponent(pesan);
  const noTujuan = "6281295785550";
  const url = `https://wa.me/${noTujuan}?text=${encodedPesan}`;

  window.open(url, "_blank");
});
