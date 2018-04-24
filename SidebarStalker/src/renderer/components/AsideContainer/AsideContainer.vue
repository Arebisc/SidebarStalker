<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo nav-bar"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
      <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span>Wykład</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>Ustawienia</span>
        </template>
          <el-menu-item index="2-1">Eksport</el-menu-item>
          <el-menu-item index="2-2">Import</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span>Wyjście</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import './AsideContainer.scss';
</style>
