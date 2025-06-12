document.addEventListener("DOMContentLoaded", () => {
  const ORS_API_KEY = "5b3ce3597851110001cf62487adbc05d823f4ad1ad06c931dc40a46d";

 // Lokasi awal default (Yogyakarta)
const defaultLocation = [-7.7925, 110.3657];
const map = L.map("map").setView(defaultLocation, 13);


  // Layer peta OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  // Daftar gerai contoh
  const geraiList = [
     { name: "Gerai Malioboro", lat: -7.7925, lng: 110.3657 },
    { name: "Gerai UGM", lat: -7.7714, lng: 110.3770 },
    { name: "Gerai Ambarukmo", lat: -7.7831, lng: 110.4081 }
  ];

  // Tambahkan marker gerai ke peta
  geraiList.forEach(gerai => {
    L.marker([gerai.lat, gerai.lng])
      .addTo(map)
      .bindPopup(`<strong>${gerai.name}</strong>`);
  });

  // Fungsi mendapatkan rute dari ORS API
  async function getRoute(start, end) {
    const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

    const body = {
      coordinates: [
        [start[1], start[0]], // ORS pakai format lng, lat
        [end[1], end[0]]
      ]
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": ORS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("Gagal mengambil data rute");
      return await res.json();
    } catch (err) {
      alert(err.message);
      return null;
    }
  }

  // Fungsi gambar rute di peta
  function drawRoute(routeGeoJSON) {
    if (window.routeLayer) {
      map.removeLayer(window.routeLayer);
    }
    window.routeLayer = L.geoJSON(routeGeoJSON, {
      style: { color: "blue", weight: 5 }
    }).addTo(map);

    // Zoom ke rute
    map.fitBounds(window.routeLayer.getBounds().pad(0.5));
  }

  // Deteksi lokasi user dengan Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const userLatLng = [position.coords.latitude, position.coords.longitude];

      // Marker lokasi user
      const userMarker = L.marker(userLatLng, {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })
      }).addTo(map).bindPopup("Lokasi Anda").openPopup();

      // Cari gerai terdekat dengan jarak Euclidean sederhana
      let nearestGerai = null;
      let minDist = Infinity;
      for (const gerai of geraiList) {
        const dist = Math.sqrt(
          Math.pow(userLatLng[0] - gerai.lat, 2) +
          Math.pow(userLatLng[1] - gerai.lng, 2)
        );
        if (dist < minDist) {
          minDist = dist;
          nearestGerai = gerai;
        }
      }

      if (nearestGerai) {
        // Panggil API ORS untuk rute jalan
        const routeData = await getRoute(userLatLng, [nearestGerai.lat, nearestGerai.lng]);
        if (routeData) {
          drawRoute(routeData);
          userMarker.bindPopup(`Lokasi Anda<br>Rute ke <strong>${nearestGerai.name}</strong>`).openPopup();
        }
      }
    }, err => {
      alert("Gagal mendapatkan lokasi: " + err.message);
    });
  } else {
    alert("Geolocation tidak didukung browser ini.");
  }
});
