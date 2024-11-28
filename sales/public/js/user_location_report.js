frappe.query_reports["User Location Report"] = {
    "columns": [
        {
            "label": "User ID",
            "fieldname": "user_id",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "label": "Latitude",
            "fieldname": "latitude",
            "fieldtype": "Float",
            "width": 100
        },
        {
            "label": "Longitude",
            "fieldname": "longitude",
            "fieldtype": "Float",
            "width": 100
        },
        {
            "label": "Battery Level",
            "fieldname": "battery_level",
            "fieldtype": "Int",
            "width": 120,
            "formatter": function (value, row, column, data, default_formatter) {
                if (value < 20) {
                    return `<span style="color: red; font-weight: bold;">${value}%</span>`;
                }
                return default_formatter(value, row, column, data);
            }
        }
    ],
    "filters": [
        {
            "fieldname": "user_id",
            "label": "User ID",
            "fieldtype": "Data",
            "default": ""
        },
        {
            "fieldname": "date",
            "label": "Date",
            "fieldtype": "Date",
            "default": frappe.datetime.now_date()
        }
    ]
};
