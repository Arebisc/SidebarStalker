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
          <span>{{ $t('custom.asideMenuBar.lecture') }}</span>
      </el-menu-item>
      <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span>{{ $t('custom.asideMenuBar.settings') }}</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span>{{ $t('custom.asideMenuBar.exit') }}</span>
      </el-menu-item>
      <el-menu-item index="4" @click="countPeople">
        <span>{{ $t('custom.asideMenuBar.detectedPeopleNumber') }}: {{ numberOfPeople }} </span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data() {
    return {
      numberOfPeople: 0
    };
  },
  methods: {
    countPeople() {
      ipcRenderer.send("detect-people-request");
    },
  },
  created() {
    let self = this;

    ipcRenderer.on("detect-people-response", (event, args) => {
      console.log("Number of people: " + args);
      self.numberOfPeople = args;
    });

    ipcRenderer.on("ping", data => {
      console.log(data);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./AsideContainer.scss";
</style>
