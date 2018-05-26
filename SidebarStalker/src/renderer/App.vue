<template>
  <div id="app">
    <router-view></router-view>
    <notifications group="global" />
    <el-button class="switch-lang__button" @click="switchLang">{{ langBtn }}</el-button>
  </div>
</template>

<script>
import { SidebarStalkerUtils } from '@/helpers/sidebarStalkerUtils';

export default {
  name: 'sidebarstalker',
  
  created() {
    this.getUserLanguage();
    this.setEventListiners();
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
