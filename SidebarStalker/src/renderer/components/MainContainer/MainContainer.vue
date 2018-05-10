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
            width="30%">

            <el-form ref="addStudentForm" :rules="addStudentFormRules" :model="addStudentForm" >
                <el-form-item prop="firstName">
                    <el-input v-model="addStudentForm.firstName" placeholder="Wprowadź imię studenta"></el-input>
                </el-form-item>
                <el-form-item prop="lastName">
                    <el-input v-model="addStudentForm.lastName" placeholder="Wprowadź nazwisko studenta"></el-input>
                </el-form-item>
                <el-form-item prop="index">
                    <el-input v-model="addStudentForm.index" placeholder="Wprowadź index studenta"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">Resetuj</el-button>
                <el-button type="primary" @click="submitForm">Dodaj</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { ipcRenderer } from 'electron';
import { EventBus } from '@/helpers/eventBusHelpers';
import JsonExcel from 'vue-json-to-excel/JsonExcel';
import moment from 'moment';

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

            addStudentFormVisibility: false,

            addStudentForm: {
                firstName: "",
                lastName: "",
                index: ""
            },

            addStudentFormRules: {
                firstName: [
                    { required: true, message: 'Imię nie może być puste', trigger: 'blur' }
                ],
                lastName: [
                    { required: true, message: 'Nazwisko nie może być puste', trigger: 'blur' },
                ],
                index: [
                    { required: true, message: 'Index nie może być pusty', trigger: 'blur' },
                    { min: 1, max: 10, message: 'Index musi mieć długość z zakresu 1 - 10', trigger: 'blur' }
                ],
            }
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
        submitForm() {
            this.$refs['addStudentForm'].validate((valid) => {
                if (valid) {
                    var student = {
                        date: moment().format('DD.MM.YYYY h:mm:ss'), // May 10th 2018, 2:08:21 pm,
                        firstname: this.addStudentForm.firstName,
                        lastname: this.addStudentForm.lastName,
                        index: this.addStudentForm.index
                    }

                    this.tableData.push(student);
                    this.resetForm();
                    this.addStudentFormVisibility = false
                } 
                else {
                    this.$notify({
                        group: 'global',
                        title: "Błąd!",
                        text: "Formularz zawiera błędy!"
                    });
                }
            });
        },

        resetForm() {
            this.$refs['addStudentForm'].resetFields();
        }   
    }
}
</script>
<style lang="scss">
@import './MainContainer.scss';
</style>
