<template>
  <div>
    <h1>Welcome to PWA Location App</h1>
    <GoogleMap />
    <LocationChecker />
  </div>
</template>

<script>
import GoogleMap from '../components/GoogleMapView.vue';
import LocationChecker from '../components/LocationChecker.vue';

export default {
  name: "Home",
  components: {
    GoogleMap,
    LocationChecker,
  },
};
</script>
