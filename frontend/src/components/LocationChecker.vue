<template>
    <div>
      <p v-if="error" style="color: red;">{{ error }}</p>
      <p v-if="batteryLevel !== null">Battery Level: {{ batteryLevel }}%</p>
      <p v-if="isCharging !== null">
        Charging Status: {{ isCharging ? "Charging" : "Not Charging" }}
      </p>
      <button @click="sendLocationAndBattery">Send Location and Battery Info to ERPNext</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        error: null,
        latitude: null,
        longitude: null,
        batteryLevel: null, // Battery percentage
        isCharging: null,   // Charging status
        offlineData: [],    // Cache for offline data
      };
    },
    created() {
      this.initializeBatteryListeners();
      window.addEventListener('online', this.syncOfflineData);
    },
    beforeDestroy() {
      this.removeBatteryListeners();
      window.removeEventListener('online', this.syncOfflineData);
    },
    methods: {
      async initializeBatteryListeners() {
        if ('getBattery' in navigator) {
          try {
            const battery = await navigator.getBattery();
            this.batteryLevel = Math.floor(battery.level * 100);
            this.isCharging = battery.charging;
  
            // Listen for changes
            battery.addEventListener('levelchange', () => {
              this.batteryLevel = Math.floor(battery.level * 100);
              this.notifyLowBattery();
            });
            battery.addEventListener('chargingchange', () => {
              this.isCharging = battery.charging;
            });
          } catch (error) {
            console.error("Error initializing battery listeners:", error);
          }
        } else {
          console.error("Battery Status API is not supported by your browser.");
        }
      },
      removeBatteryListeners() {
        // Ensure listeners are removed when the component is destroyed
        if ('getBattery' in navigator) {
          navigator.getBattery().then((battery) => {
            battery.removeEventListener('levelchange');
            battery.removeEventListener('chargingchange');
          });
        }
      },
      notifyLowBattery() {
        if (this.batteryLevel !== null && this.batteryLevel <= 20) {
          alert("Battery is critically low! Please charge your device.");
        }
      },
      async sendLocationAndBattery() {
        try {
          await this.getLocation();
          const data = {
            user_id: this.getUserID(),
            latitude: this.latitude,
            longitude: this.longitude,
            battery_level: this.batteryLevel,
            is_charging: this.isCharging,
            timestamp: new Date().toISOString(),
          };
          await this.sendDataToERPNext(data);
        } catch (error) {
          console.error("Error sending data:", error);
          this.cacheOfflineData(data);
        }
      },
      cacheOfflineData(data) {
        // Store data in local cache
        this.offlineData.push(data);
        localStorage.setItem('offlineData', JSON.stringify(this.offlineData));
      },
      syncOfflineData() {
        const cachedData = JSON.parse(localStorage.getItem('offlineData')) || [];
        cachedData.forEach(async (data) => {
          try {
            await this.sendDataToERPNext(data);
            this.offlineData = this.offlineData.filter((item) => item !== data);
            localStorage.setItem('offlineData', JSON.stringify(this.offlineData));
          } catch (error) {
            console.error("Error syncing offline data:", error);
          }
        });
      },
      getLocation() {
        return new Promise((resolve, reject) => {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                resolve();
              },
              (error) => reject(new Error("Error fetching location: " + error.message))
            );
          } else {
            reject(new Error("Geolocation is not supported by your browser."));
          }
        });
      },
      sendDataToERPNext(data) {
        const apiURL = 'https://your-erpnext-site/api/resource/User%20Location'; // Replace with ERPNext API URL
        return fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token YOUR_API_KEY:YOUR_API_SECRET`, // Replace with your credentials
          },
          body: JSON.stringify(data),
        }).then((response) => response.json());
      },
      getUserID() {
        return localStorage.getItem('user_id') || 'Guest';
      },
    },
  };
  </script>
  