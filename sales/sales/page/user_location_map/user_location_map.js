frappe.pages['user-location-map'].on_page_load = function(wrapper) {
	let page = frappe.ui.make_app_page({
	  parent: wrapper,
	  title: 'User Location Map',
	  single_column: true
	});
  
	const mapContainer = $(`<div id="map" style="width: 100%; height: 600px;"></div>`);
	$(page.main).append(mapContainer);
  
	frappe.call({
	  method: "frappe.client.get_list",
	  args: {
		doctype: "User Location",
		fields: ["latitude", "longitude", "user_id", "battery_level"],
		limit_page_length: 100
	  },
	  callback: function(r) {
		const locations = r.message;
		const map = new google.maps.Map(document.getElementById("map"), {
		  center: { lat: 0, lng: 0 },
		  zoom: 2,
		});
  
		locations.forEach((loc) => {
		  const marker = new google.maps.Marker({
			position: { lat: loc.latitude, lng: loc.longitude },
			map: map,
			title: `${loc.user_id} (Battery: ${loc.battery_level}%)`
		  });
		});
	  }
	});
  };
  