<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo nav-bar"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
      <el-menu-item index="1" @click="$router.push({ name: 'main-page'})">
          <i class="el-icon-location"></i>
          <span>{{ $t('custom.asideMenuBar.lecture') }}</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push({ name: 'settings-page' })">
          <i class="el-icon-menu"></i>
          <span>{{ $t('custom.asideMenuBar.settings') }}</span>
      </el-menu-item>
      <el-menu-item index="3" @click="handleAppExit">
        <i class="el-icon-setting"></i>
        <span>{{ $t('custom.asideMenuBar.exit') }}</span>
      </el-menu-item>
      <el-menu-item index="4" @click="countPeople">
        <span>{{ $t('custom.asideMenuBar.detectedPeopleNumber') }}: {{ numberOfPeople }} </span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import { ipcRenderer, remote } from "electron";

export default {
  data() {
    return {
      numberOfPeople: 0
    };
  },
  methods: {
    countPeople() {
      let settings = {
        "cameraPort": this.$store.getters.settings.cameraPort,
        "cameraIp": this.$store.getters.settings.cameraIp
      }

      ipcRenderer.send("detect-people-request", settings);
    },

    notifyCameraError() {
      let self = this;

      this.$notify({
        group: 'global',
        title: self.$t("custom.notifications.error"),
        text: self.$t("custom.notifications.cameraErrorOccured"),
        duration: 10000
      });
    },

    handleAppExit() {
      let window = remote.getCurrentWindow();
      window.close();
    }
  },
  created() {
    let self = this;

    ipcRenderer.on("detect-people-response", (event, args) => {
      self.numberOfPeople = args;
    });

    ipcRenderer.on("detect-people-error", (event, args) => {
      self.notifyCameraError();
    })

    ipcRenderer.on("ping", data => {
      console.log(data);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./AsideContainer.scss";
</style>
