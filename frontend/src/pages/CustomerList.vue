<template>
  <div>
    <button @click="createCustomer">Create Customer</button>
    <ul>
      <li v-for="customer in customers" :key="customer.name">
        {{ customer.customer_name }}
        <button @click="editCustomer(customer)">Edit</button>
      </li>
    </ul>
    <CustomerForm v-if="selectedCustomer" :customer="selectedCustomer" @save="fetchCustomers" />
  </div>
</template>

<script>
import { frappe } from "../utils/frappeAPI";
import CustomerForm from "../components/CustomerForm.vue";

export default {
  components: { CustomerForm },
  data() {
    return { customers: [], selectedCustomer: null };
  },
  methods: {
    fetchCustomers() {
      frappe.get("Customer").then((res) => (this.customers = res.data.data));
    },
    createCustomer() {
      this.selectedCustomer = {};
    },
    editCustomer(customer) {
      this.selectedCustomer = customer;
    },
  },
  mounted() {
    this.fetchCustomers();
  },
};
</script>
