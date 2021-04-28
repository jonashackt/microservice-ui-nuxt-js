<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">microservice-ui-nuxt-js</h1>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green">Documentation</a>
        <a href="https://github.com/jonashackt/microservice-ui-nuxt-js" target="_blank" rel="noopener noreferrer" class="button--grey">GitHub</a>
      </div>
      <el-divider></el-divider>
      <el-alert
        title="This Nuxt.js Server Side Rendered app is build to elaborate the differences to a default SPA setup like:"
        type="success"
        center
        show-icon>
      </el-alert>
      <div class="links">
        <a href="https://github.com/jonashackt/spring-boot-vuejs" target="_blank" rel="noopener noreferrer" class="button--grey">spring-boot-vuejs</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
