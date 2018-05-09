<template>
    <div class="main-container__wrapper">
        <el-button type="primary" @click="addStudentFormVisibility = true">
            Dodaj studenta
        </el-button>
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
        <download-excel
            class = "btn btn-default"
            :data = "tableData"
            :fields = "tableFields"
            name = "filename.xls">
            Exportuj xls
        </download-excel>
        <download-excel
            class = "btn btn-default"
            :data = "tableData"
            :fields = "tableFields"
            type = "csv"
            name = "filename.csv">
            Exportuj csv
        </download-excel>

        <el-dialog
            title="Dodaj studenta"
            :visible.sync="addStudentFormVisibility"
            width="30%"
            :before-close="handleClose">
            <span>This is a message</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addStudentFormVisibility = false">Cancel</el-button>
                <el-button type="primary" @click="addStudentFormVisibility = false">Confirm</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { ipcRenderer } from 'electron';
import { EventBus } from '@/helpers/eventBusHelpers';
import JsonExcel from 'vue-json-to-excel/JsonExcel';


export default {
    components: {
      'downloadExcel': JsonExcel
    },
    data() {
        return {
            tableFields : {
                "Data": "DateTime",
                "Imię": "String",
                "Nazwisko": "String",
                "Index": "Number"
            },
            tableData: [
                {
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
            ],
            tableMeta: [
                [
                    {
                        'key': 'charset',
                        'value': 'utf-8'
                    }
                ]
            ],

            addStudentFormVisibility: false
        }
    },
    
    created() {
        ipcRenderer.on('pingCommunicate', (event, args) => {
            this.$notify({
                group: 'global',
                title: 'Child process',
                text: args.toString('utf8')
            })
        });

        EventBus.$on('exportTableToXls', () => {
            console.log('exportTableToXls called');
        });
    },

    methods: {
        handleClose(done) {
            this.$confirm('Are you sure to close this dialog?')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
    }
}
</script>
<style lang="scss">
@import './MainContainer.scss';
</style>
