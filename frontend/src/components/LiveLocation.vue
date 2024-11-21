<template>
    <div>
      <div id="map" style="height: 500px; width: 100%;"></div>
    </div>
  </template>
  
  <script>
  import { Loader } from "@googlemaps/js-api-loader";
  
  export default {
    data() {
      return {
        map: null,
        userMarker: null,
        userCoords: { lat: 0, lng: 0 },
      };
    },
    methods: {
      async initMap() {
        // Load the Google Maps script
        const loader = new Loader({
          apiKey:'', // Replace with your API Key
          version: "weekly",
        });
  
        const google = await loader.load();
  
        // Initialize the map
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 0, lng: 0 }, // Default center
          zoom: 13,
        });
  
        // Initialize the marker for the user's location
        this.userMarker = new google.maps.Marker({
          position: { lat: 0, lng: 0 },
          map: this.map,
          title: "Your location",
        });
      },
      updateLocation(position) {
        const { latitude, longitude } = position.coords;
  
        // Update user's coordinates
        this.userCoords = { lat: latitude, lng: longitude };
  
        // Update marker position and re-center map
        this.userMarker.setPosition(this.userCoords);
        this.map.setCenter(this.userCoords);
      },
      trackLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            this.updateLocation,
            (error) => {
              console.error("Error getting location:", error);
            },
            { enableHighAccuracy: true }
          );
        } else {
          alert("Geolocation is not supported by your browser.");
        }
      },
    },
    mounted() {
      this.initMap().then(() => {
        this.trackLocation();
      });
    },
  };
  </script>
  
  <style>
  #map {
    height: 100vh; /* Full viewport height for the map */
  }
  </style>
  