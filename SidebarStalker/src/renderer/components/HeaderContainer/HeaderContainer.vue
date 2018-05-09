<template>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">Tabela studentów</el-menu-item>
  <el-submenu index="2">
    <template slot="title">Eksport</template>
    <el-menu-item index="2-1">PDF</el-menu-item>
    <el-menu-item index="2-2" @click="triggerExport">XLS</el-menu-item>
  </el-submenu>
</el-menu>
</template>
<script>
import { EventBus } from '@/helpers/eventBusHelpers';

export default {
     data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      
      triggerExport() {
        EventBus.$emit("exportTableToXls");
      }
    }
}
</script>
<style lang="scss" scoped>
@import './HeaderContainer.scss';
</style>
