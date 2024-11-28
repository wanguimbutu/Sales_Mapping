import frappe

@frappe.whitelist()
def sync_customer(data):
    customer = frappe.get_doc("Customer", data["name"])
    customer.update(data)
    customer.save()
    return {"message": "Updated successfully"}

def sync_sales_order(data):
    if "name" in data:
        sales_order = frappe.get_doc("Sales Order", data["name"])
        sales_order.update(data)
    else:
        sales_order = frappe.get_doc({"doctype": "Sales Order", **data})
    sales_order.insert()
    sales_order.submit()
    return {"message": "Sales Order Saved", "name": sales_order.name}
