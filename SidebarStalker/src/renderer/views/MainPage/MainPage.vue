<template>
  <div class="main_page__wrapper">
      <h1>This is main page</h1>
      <p>{{ getCounterValue }}</p>
      <el-button @click="callIncrementCounter">Increment</el-button>
  </div>
</template>

<script>
export default {
  data() {
      return {

      }
  },
  methods: {
      callIncrementCounter() {
          this.$store.dispatch('incrementCounter', 1);
      }
  },
  computed: {
      getCounterValue() {
          return this.$store.getters.counter;
      }
  }
}
</script>

<style lang="scss">
@import './MainPage.scss';
</style>
