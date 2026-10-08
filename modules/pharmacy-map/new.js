document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([0, 0], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  let latitudeElement = document.getElementById("latitude");
  let longitudeElement = document.getElementById("longitude");

  document.getElementById("getLocation").addEventListener("click", getLocation);

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });

      } else {
          alert("Geolocation is not supported by this browser.");
      }
  }

  function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      map.setView([latitude, longitude], 13);
      L.marker([latitude, longitude]).addTo(map);

      latitudeElement.textContent = `Latitude: ${latitude.toFixed(6)}`;
      longitudeElement.textContent = `Longitude: ${longitude.toFixed(6)}`;
  }

  function showError(error) {
      switch (error.code) {
          case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.");
              break;
          case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
          case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
          case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.");
              break;
      }
  }
});



// document.addEventListener("DOMContentLoaded", function () {
//   const map = L.map("map").setView([0, 0], 13);
//   const userMarker = L.marker([0, 0], { draggable: true }).addTo(map);
//   const pharmacyMarkers = L.layerGroup().addTo(map);
  
//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//   let latitudeElement = document.getElementById("latitude");
//   let longitudeElement = document.getElementById("longitude");
//   let pharmaciesList = document.getElementById("pharmacies-list");

//   document.getElementById("getLocation").addEventListener("click", getLocation);

//   map.on("click", function (e) {
//       const { lat, lng } = e.latlng;
//       updateMarkerPosition(lat, lng);
//       findNearbyPharmacies(lat, lng);
//   });

//   userMarker.on("dragend", function (e) {
//       const { lat, lng } = e.target.getLatLng();
//       updateMarkerPosition(lat, lng);
//       findNearbyPharmacies(lat, lng);
//   });

//   function getLocation() {
//       if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });

//       } else {
//           alert("Geolocation is not supported by this browser.");
//       }
//   }

//   function showPosition(position) {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;

//       map.setView([latitude, longitude], 13);
//       updateMarkerPosition(latitude, longitude);
//       findNearbyPharmacies(latitude, longitude);

//       latitudeElement.textContent = `Latitude: ${latitude.toFixed(6)}`;
//       longitudeElement.textContent = `Longitude: ${longitude.toFixed(6)}`;
//   }

//   function showError(error) {
//       switch (error.code) {
//           case error.PERMISSION_DENIED:
//               alert("User denied the request for Geolocation.");
//               break;
//           case error.POSITION_UNAVAILABLE:
//               alert("Location information is unavailable.");
//               break;
//           case error.TIMEOUT:
//               alert("The request to get user location timed out.");
//               break;
//           case error.UNKNOWN_ERROR:
//               alert("An unknown error occurred.");
//               break;
//       }
//   }

//   function updateMarkerPosition(latitude, longitude) {
//       userMarker.setLatLng([latitude, longitude]);
//       latitudeElement.textContent = `Latitude: ${latitude.toFixed(6)}`;
//       longitudeElement.textContent = `Longitude: ${longitude.toFixed(6)}`;
//   }

//   function findNearbyPharmacies(latitude, longitude) {
//       const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`;

//       fetch(apiUrl)
//           .then(response => response.json())
//           .then(data => {
//               const address = data.display_name || "";
//               const pharmaciesUrl = `https://nominatim.openstreetmap.org/search?format=json&q=pharmacy&limit=3&bounded=1&viewbox=${data.boundingbox.join(",")}&addressdetails=1`;
              
//               return fetch(pharmaciesUrl);
//           })
//           .then(response => response.json())
//           .then(pharmacies => {
//               displayPharmacies(pharmacies);
//               displayPharmacyMarkers(pharmacies);
//           })
//           .catch(error => {
//               console.error("Error fetching nearby pharmacies:", error);
//               pharmaciesList.innerHTML = "Error fetching nearby pharmacies.";
//               pharmacyMarkers.clearLayers();
//           });
//   }

//   function displayPharmacies(pharmacies) {
//       pharmaciesList.innerHTML = "<strong>Nearby Pharmacies:</strong><br>";
      
//       pharmacies.forEach(pharmacy => {
//           pharmaciesList.innerHTML += `<li>${pharmacy.display_name}</li>`;
//       });
//   }

//   function displayPharmacyMarkers(pharmacies) {
//       pharmacyMarkers.clearLayers();

//       pharmacies.forEach(pharmacy => {
//           const { lat, lon } = pharmacy;
//           const marker = L.marker([lat, lon]).addTo(pharmacyMarkers);
//           marker.bindPopup(`<b>${pharmacy.display_name}</b>`).openPopup();
//       });
//   }
// });
