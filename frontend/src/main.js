import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router"; // Assuming a router.js file is set up for routing

// Create the Vue app
const app = createApp(App);

// Use the router for navigation
app.use(router);

// Mount the app
app.mount("#app");
