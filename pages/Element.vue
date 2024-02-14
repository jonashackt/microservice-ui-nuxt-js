<template>
  <div class="element">
    <h1>{{ msg }}</h1>
    <h5>API service calls are easy to do with Vue/Nuxt/$fetch, if you know how to do it.</h5>
    <h6><el-tag>Let´s go!</el-tag> Call a Spring Boot REST backend service, by clicking a button:</h6>
    <el-button type="success" @click="fetchHelloApi" id="btnCallHello" icon="el-icon-video-play">Call backend API /hello (HTTP GET)</el-button>
    <h4>Backend response:</h4>
    <h6 :show="showResponse" dismissible @dismissed="showResponse=false">{{ helloMsg }}</h6>

    <el-button type="info" @click="showCollapse = !showCollapse" icon="el-icon-unlock">Show Response details</el-button>
    <transition name="el-fade-in">
      <div v-show="showCollapse" class="transition-box">
        <el-card border-radius="30px">
          The response had the following details:

          <el-collapse v-model="collapseHttpStatusFocussed">
            <el-collapse-item title="HTTP Status" name="collapseInnerStatusCode">
              <div>Status: {{ httpStatusCode }}</div>
              <div>baseURL: {{ baseUrl }}</div>
            </el-collapse-item>
          </el-collapse>

          <el-collapse>
            <el-collapse-item title="HTTP Headers" name="collapseInnerHeaders">

              <p v-if="headers">
                <li v-for="header of headers">
                  {{ header }}
                </li>
              </p>
            </el-collapse-item>
          </el-collapse>

          <el-collapse>
            <el-collapse-item title="Full Request configuration" name="collapseInnerResponseConfig">
              Config: {{ config }}
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">

// for el-fade-in see https://element-plus.org/en-US/guide/transitions.html#fade
import { ref } from 'vue'
const showCollapse = ref(false)

const msg = 'Nice Element.js candy!'
const helloMsg = ref('');

var collapseHttpStatusFocussed = "collapseInnerStatusCode"
var showResponse = false
var httpStatusCode: number

var headers: Headers

const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

// See https://github.com/nuxt/nuxt/discussions/19447
async function fetchHelloApi() {

  // see https://github.com/nuxt/nuxt/issues/23635
  const response = await $fetch(baseUrl + '/api/hello', {
    raw: true,
    async onResponse({ response }) {
      helloMsg.value = response._data;
      console.log('Headers', response.headers);
      headers = response.headers
      httpStatusCode = response.status
    },
  });
  
  return {response: response};
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin-bottom: 20px;
}

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
</style>
