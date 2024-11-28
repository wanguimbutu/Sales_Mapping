<template>
    <div>
      <h2>{{ order.name ? "Edit Sales Order" : "Create Sales Order" }}</h2>
      <form @submit.prevent="saveOrder">
        <label>Customer</label>
        <input v-model="order.customer" placeholder="Customer" required />
        
        <label>Items</label>
        <ul>
          <li v-for="(item, index) in order.items" :key="index">
            <input v-model="item.item_code" placeholder="Item Code" />
            <input v-model="item.qty" type="number" placeholder="Quantity" />
            <button @click.prevent="removeItem(index)">Remove</button>
          </li>
        </ul>
        <button @click.prevent="addItem">Add Item</button>
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import { frappe } from "../utils/frappeAPI";
  
  export default {
    name: "SalesOrderForm",
    props: ["order"],
    methods: {
      addItem() {
        this.order.items.push({ item_code: "", qty: 1 });
      },
      removeItem(index) {
        this.order.items.splice(index, 1);
      },
      saveOrder() {
        const method = this.order.name ? "update" : "post";
        const endpoint = this.order.name ? `Sales Order/${this.order.name}` : "Sales Order";
        frappe[method](endpoint, this.order).then(() => {
          this.$emit("save");
        });
      },
    },
  };
  </script>
  