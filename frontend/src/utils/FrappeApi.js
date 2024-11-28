import axios from "axios";

export const frappe = axios.create({
  baseURL: "https://erpnext-181781-0.cloudclusters.net//api/resource",
  withCredentials: true,
});
