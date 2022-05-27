<template>
  <div class="about">
    <h1>This is an HomeContainer page</h1>
    <router-view></router-view>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeContainer",
  components: {},
  // setup() {},
});
</script>
