import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API Key
    libraries: 'places', // Required if you use the Places API
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
