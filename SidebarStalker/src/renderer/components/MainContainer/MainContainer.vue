<template>
    <div class="main-container__wrapper">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column
                prop="date"
                label="Data">
            </el-table-column>
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
import { ipcRenderer } from 'electron'

export default {
    data() {
        return {
            tableData: [{
                date: '2018.04.10 13:30:35',
                    firstname: 'Michał',
                    lastname: 'Sibera',
                    index: '126827'
                }, 
                {
                    date: '2018.04.10 13:31:22',
                    firstname: 'Dawid',
                    lastname: 'Wojciechowski',
                    index: '126112'
                }, 
                {
                    date: '2018.04.10 13:30:56',
                    firstname: 'Sebastian',
                    lastname: 'Niespodziany',
                    index: '126222'
                }, 
                {
                    date: '2018.04.10 13:45:00',
                    firstname: 'Bartłomiej',
                    lastname: 'Wierzbinski',
                    index: '126333'
                }
            ]
        }
    },
    created() {
        ipcRenderer.on('cardReaderCommunication', (event, args) => {
            this.$notify({
                group: 'global',
                title: 'Nowa osoba:',
                text: args.toString('utf8')
            });
        });
    }
}
</script>
<style lang="scss">
@import './MainContainer.scss';
</style>
