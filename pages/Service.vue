<template>
  <div class="service">
    <h1>{{ msg }}</h1>
    <h2>REST service call results</h2>

    <button @click="fetchHelloApi">CALL Spring Boot REST backend service</button>
    
    <h4 v-if="!apiCallPending && !apiCallError">Backend response: {{ helloMsg }}</h4>

    <p v-if="apiCallError">Error: {{ apiCallError.message }}</p>

  </div>
</template>

<script setup lang="ts">

const msg = 'HowTo call APIs using Nuxt3 useFetch():';

// If you wanted to call the API on page load, use the following one liner:
//const { data, pending, error, refresh } = await useAPIFetch('/hello', )

const helloMsg = ref('');
let apiCallPending = ref(false);
let apiCallError: any;

// See https://github.com/nuxt/nuxt/discussions/19447
async function fetchHelloApi() {
  const { data, pending, error } = await useAPIFetch<string>('/hello', );
  console.log(data);
  helloMsg.value = data.value || '';
  apiCallPending = pending;
  apiCallError = error;
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .service {
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
