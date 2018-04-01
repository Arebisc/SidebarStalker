<template>
    <el-container id="mainpage__wrapper">
        <el-aside style="width: 20%" id="asidecontainer__wrapper">
            <aside-container></aside-container>
        </el-aside>
        <el-container>
            <el-header id="app-header__wrapper">
                <header-container></header-container>
            </el-header>
            <el-main>
                <main-container></main-container>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import MainContainer from '@/components/MainContainer/MainContainer';
import AsideContainer from '@/components/AsideContainer/AsideContainer';
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer';

export default {
    components: {
        'main-container': MainContainer,
        'aside-container': AsideContainer,
        'header-container': HeaderContainer
    },
    data() {
        return {

        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
@import './MainPage.scss';
</style>
