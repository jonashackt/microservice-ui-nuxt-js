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

</script>

<style scoped>
.links {
  padding-top: 15px;
}
</style>

