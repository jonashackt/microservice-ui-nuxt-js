<template>
  <div class="element">
    <h1>Create User</h1>

    <h3>Just some database interaction...</h3>

    <input type="text" v-model="user.firstName" placeholder="first name">
    <input type="text" v-model="user.lastName" placeholder="last name">

    <button @click="createNewUser">Create User</button>

    <div v-if="showResponse"><h6>User created with Id: {{ user.id }}</h6></div>

    <button v-if="showResponse" @click="retrieveUser">Retrieve user {{user.id }} data from database</button>

    <h4 v-if="showRetrievedUser">Retrieved User {{retrievedUser.firstName}} {{retrievedUser.lastName}}</h4>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const showResponse = ref(false);
const showRetrievedUser = ref(false);

interface User {
    id: number;
    firstName: string;
    lastName: string;
};

let user = ref({ id: 0, firstName: '', lastName: ''});

async function createNewUser () {

  const {data: id, pending, error} = await useAPIFetch<number>(`/user/` + user.value.firstName + '/' + user.value.lastName, {
    method: 'post'
  });
  console.log('Created new User with Id ' + id.value);
  showResponse.value = true;

  user.value.id = id.value || 0;
};

let retrievedUser = ref({ id: 0, firstName: '', lastName: ''});

async function retrieveUser () {

  const {data: respondedUser, pending, error} = await useAPIFetch<User>(`/user/` + user.value.id);
  showRetrievedUser.value = true;

  retrievedUser.value = respondedUser.value || { id: 0, firstName: '', lastName: ''};
};

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
</style>
