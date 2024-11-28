<template>
  <div id="map" style="height: 500px;"></div>
</template>

<script>
export default {
  props: ["locations"],
  mounted() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });

    this.locations.forEach((loc) => {
      new google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lon },
        map,
        title: loc.name,
      });
    });
  },
};
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAVplGwMjlkNpU1Q_mx510I7HxagasHnD0"></script>
