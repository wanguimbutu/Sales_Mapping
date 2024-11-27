<template>
    <div>
      <h1>Welcome to PWA Location App</h1>
      <LocationChecker />
    </div>
  </template>
  
  <script>
  import LocationChecker from "../components/LocationChecker.vue";
  
  export default {
    name: "Home",
    components: {
      LocationChecker,
    },
  };
  </script>
  