import axios from "axios";

export const frappe = axios.create({
  baseURL: "",
  withCredentials: true,
});
