<template>
  <div class="element">
    <h1>{{ msg }}</h1>
    <h5>REST service call are easy to do with Vue.js, if you know how to do it.</h5>
    <p></p>
    <h6><el-tag>Let´s go!</el-tag> Call a Spring Boot REST backend service, by clicking a button:</h6>
    <p></p>
      <el-button type="success" @click="callHelloApi()" id="btnCallHello" icon="el-icon-video-play">Call backend API /hello (HTTP GET)</el-button>
      <p></p>
    <h4 border>Backend response:</h4>
    <span :show="showResponse" dismissible @dismissed="showResponse=false">{{ backendResponse }}</span>
    <p></p>
    <el-button type="info" @click="showCollapse = !showCollapse" icon="el-icon-unlock">Show Response details</el-button>
    <p></p>
    <transition name="el-fade-in">
      <div v-show="showCollapse" class="transition-box">
        <el-card border-radius="30px">
          The response had the following details:

          <el-collapse v-model="collapseHttpStatusFocussed">
            <el-collapse-item title="HTTP Status" name="collapseInnerStatusCode">
              <div>Status: {{ httpStatusCode }}</div>
              <div>baseURL: {{ responseConfig.baseURL }}</div>
            </el-collapse-item>
          </el-collapse>

          <el-collapse>
            <el-collapse-item title="HTTP Headers" name="collapseInnerHeaders">
              <p v-if="headers && headers.length">
                <li v-for="header of headers">
              <div>{{ header }}</div>
              </li>
              </p>
            </el-collapse-item>
          </el-collapse>

          <el-collapse>
            <el-collapse-item title="Full Request configuration" name="collapseInnerResponseConfig">
              <div>Config: {{ responseConfig }} </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import api from "../plugins/axios";
import {AxiosError, AxiosRequestConfig} from "axios";

interface State {
  msg: string;
  showCollapse: boolean,
  collapseHttpStatusFocussed: string,
  showResponse: boolean;
  backendResponse: string;
  responseConfig: any;
  httpStatusCode: number;
  httpStatusText: string;
  headers: string[];
  errors: AxiosError[]
}

export default defineComponent({
  name: 'Element',

  data: (): State => {
    return {
      msg: 'Nice Element.js candy!',
      showCollapse: false,
      collapseHttpStatusFocussed: "collapseInnerStatusCode",
      showResponse: false,
      backendResponse: '',
      responseConfig: '',
      httpStatusCode: 0,
      httpStatusText: '',
      headers: ['Noting here atm. Did you call the Service?'],
      errors: []
    }
  },
  methods: {
    callHelloApi (): any {
        api.hello().then(response => {
          this.backendResponse = response.data;
          this.httpStatusCode = response.status;
          this.httpStatusText = response.statusText;
          this.headers = response.headers;
          this.responseConfig = response.config;
          this.showResponse=true;
          this.$notify({
            title: 'API-Response:',
            message: this.backendResponse,
            type: 'success'
          });
        })
        .catch((error: AxiosError) => {
          this.$notify({
            title: 'API-Response:',
            message: 'We experience problems accessing our Spring Boot backend :(',
            type: 'error'
          });
          this.errors.push(error)
        })
    }
  }
});

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
