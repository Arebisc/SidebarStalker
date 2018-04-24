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
      <el-menu-item index="3" @click="sendPing">
        <i class="el-icon-setting"></i>
        <span>Ping</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span>Wyjście</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>Wykryta liczba osób: {{ numberOfPeople }} </span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
  data() {
    return {
      numberOfPeople: 0
    }
  },
  methods: {
    sendPing() {
      debugger;
      ipcRenderer.send('ping', 1);
    }
  },
  created() {
    let self = this;

    ipcRenderer.on('detect-people-response', (event, args) => {
      console.log(args);  
      self.numberOfPeople = args;
    });
    ipcRenderer.send('detect-people-request');
  }
}
</script>

<style lang="scss" scoped>
@import './AsideContainer.scss';
</style>
