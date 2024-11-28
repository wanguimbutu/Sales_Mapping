<template>
    <div>
      <h2>Edit Customer</h2>
      <form @submit.prevent="saveCustomer">
        <input v-model="customer.customer_name" placeholder="Customer Name" />
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import { frappe } from "../utils/frappeAPI";
  
  export default {
    name: "CustomerForm",
    props: ["customer"],
    methods: {
      saveCustomer() {
        frappe.update("Customer", this.customer.name, this.customer).then(() => {
          this.$emit("save");
        });
      },
    },
  };
  </script>
  