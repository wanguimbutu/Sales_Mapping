<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/tracking">Real-Time Tracking</router-link></li>
          <li><router-link to="/customers">Customers</router-link></li>
          <li><router-link to="/sales-orders">Sales Orders</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2024 TEST</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Basic styles for the app */
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
}

header {
  background-color: #4CAF50;
  padding: 1rem;
  color: white;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin: 0 1rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a.router-link-active {
  font-weight: bold;
}

main {
  padding: 2rem;
}

footer {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
