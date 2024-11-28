<template>
  <div>
    <button @click="createSalesOrder">Create Sales Order</button>
    <ul>
      <li v-for="order in salesOrders" :key="order.name">
        {{ order.customer_name }} - {{ order.grand_total }}
        <button @click="editSalesOrder(order)">Edit</button>
      </li>
    </ul>
    <SalesOrderForm v-if="selectedOrder" :order="selectedOrder" @save="fetchSalesOrders" />
  </div>
</template>

<script>
import { frappe } from "../utils/frappeAPI";
import SalesOrderForm from "../components/SalesOrderForm.vue";

export default {
  components: { SalesOrderForm },
  data() {
    return { salesOrders: [], selectedOrder: null };
  },
  methods: {
    fetchSalesOrders() {
      frappe.get("Sales Order").then((res) => (this.salesOrders = res.data.data));
    },
    createSalesOrder() {
      this.selectedOrder = {};
    },
    editSalesOrder(order) {
      this.selectedOrder = order;
    },
  },
  mounted() {
    this.fetchSalesOrders();
  },
};
</script>
