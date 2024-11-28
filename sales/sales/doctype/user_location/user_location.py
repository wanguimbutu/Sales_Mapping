import frappe

@frappe.whitelist()
def get_real_time_locations():
    users = frappe.get_all("User Location", fields=["name", "lat", "lon", "battery"])
    return {"users": users, "locations": users}
