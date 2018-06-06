<template>
  <div id="app">
    <el-container id="mainpage__wrapper">
        <el-aside style="width: 20%" id="asidecontainer__wrapper">
            <aside-container></aside-container>
        </el-aside>
        <el-container>
            <el-header id="app-header__wrapper" style="height: initial;">
                <header-container></header-container>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

    <notifications group="global" />
    <el-button class="switch-lang__button" @click="switchLang">{{ langBtn }}</el-button>
  </div>
</template>

<script>
import { SidebarStalkerUtils } from '@/helpers/sidebarStalkerUtils';
import AsideContainer from '@/components/AsideContainer/AsideContainer';
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer';
import { ipcRenderer } from 'electron';

export default {
  components: {
    'aside-container': AsideContainer,
    'header-container': HeaderContainer
  },

  name: 'sidebarstalker',
  
  created() {
    this.getUserLanguage();
    this.setEventListiners();
    this.readAppsettings();
  },

  methods: {
    getUserLanguage() {
      const lang = SidebarStalkerUtils.getUserLanguage();
      this.$store.dispatch("setUserLanguage", { vm: this, lang: lang });
    },

    setEventListiners() {
      // window.addEventListener("languagechange ", () => {
      //   this.getUserLanguage();
      // });
    },

    switchLang() {
      let lang = this.$store.getters.lang == "pl" ? "en" : "pl";
      this.$store.dispatch("setUserLanguage", { vm: this, lang: lang });
    },

    readAppsettings() {
      ipcRenderer.send('read-appsettings-request');
      ipcRenderer.on('read-appsettings-response', (event, args) => {
        this.$store.dispatch('setAppSettings', args);
      });
    }
  },

  computed: {
    langBtn() {
      return this.$store.getters.lang;
    },
  }
}
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
