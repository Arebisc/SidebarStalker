<template>
    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
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
