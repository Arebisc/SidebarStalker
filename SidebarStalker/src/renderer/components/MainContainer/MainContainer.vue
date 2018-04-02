<template>
    <div class="main-container__wrapper">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column
                prop="firstname"
                label="Imię">
            </el-table-column>
            <el-table-column
                prop="lastname"
                label="Nazwisko">
            </el-table-column>
            <el-table-column
                prop="index"
                label="Indeks">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [{
                    firstname: 'Michał',
                    lastname: 'Sibera',
                    index: '126827'
                }, 
                {
                    firstname: 'Dawid',
                    lastname: 'Wojciechowski',
                    index: '126112'
                }, 
                {
                    firstname: 'Sebastian',
                    lastname: 'Niespodziany',
                    index: '126222'
                }, 
                {
                    firstname: 'Bartłomiej',
                    lastname: 'Wierzbinski',
                    index: '126333'
                }
            ]
        }
    }
}
</script>
<style lang="scss">
@import './MainContainer.scss';
</style>
