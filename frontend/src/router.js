import { createRouter, createWebHistory } from "vue-router";
import RealTimeTracking from "./pages/RealTimeTracking.vue";
import CustomerList from "./pages/CustomerList.vue";
import SalesOrderList from "./pages/SalesOrderList.vue";

const routes = [
  { path: "/", redirect: "/tracking" },
  { path: "/tracking", component: RealTimeTracking },
  { path: "/customers", component: CustomerList },
  { path: "/sales-orders", component: SalesOrderList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
