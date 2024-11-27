<template>
    <div>
      <GmapMap
        :center="center"
        :zoom="zoom"
        style="width: 100%; height: 500px"
      >
        <GmapMarker
          :position="center"
          :clickable="true"
          :draggable="true"
          @dragend="updateMarkerPosition"
        />
      </GmapMap>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        center: { lat: 0, lng: 0 },
        zoom: 12,
      };
    },
    mounted() {
      this.getCurrentLocation();
    },
    methods: {
      getCurrentLocation() {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
            },
            (error) => {
              console.error("Error fetching location:", error.message);
            }
          );
        } else {
          console.error("Geolocation is not supported by your browser.");
        }
      },
      updateMarkerPosition(event) {
        this.center = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        console.log("New marker position:", this.center);
      },
    },
  };
  </script>
  