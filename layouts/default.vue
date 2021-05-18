<template>
  <div>
    <div id="nav">
      <NuxtLink to="/">Home</NuxtLink> |
      <NuxtLink to="/service">Service</NuxtLink> |
      <NuxtLink to="/element">Element</NuxtLink> |
      <NuxtLink to="/user">User</NuxtLink>
    </div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  text-align: center;
  color: #2c3e50;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
