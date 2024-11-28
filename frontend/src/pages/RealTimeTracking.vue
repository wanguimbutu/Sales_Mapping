<template>
  <div>
    <GoogleMapView :locations="locations" />
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - Battery: {{ user.battery }}%
      </li>
    </ul>
  </div>
</template>

<script>
import GoogleMapView from "../components/GoogleMapView.vue";
import { subscribeToChannel } from "../utils/websocket";

export default {
  components: { GoogleMapView },
  data() {
    return { users: [], locations: [] };
  },
  methods: {
    handleLocationUpdate(data) {
      const index = this.users.findIndex((u) => u.id === data.user_id);
      if (index > -1) {
        this.users[index] = { ...this.users[index], ...data };
        this.locations[index] = { lat: data.lat, lon: data.lon, name: data.user_id };
      } else {
        this.users.push({ id: data.user_id, ...data });
        this.locations.push({ lat: data.lat, lon: data.lon, name: data.user_id });
      }
    },
  },
  mounted() {
    subscribeToChannel("location_update", this.handleLocationUpdate);
  },
};
</script>
