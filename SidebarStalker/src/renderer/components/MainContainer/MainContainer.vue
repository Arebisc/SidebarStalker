<template>
    <div class="main-container__wrapper">
        <el-button type="primary" @click="addStudentFormVisibility = true">
            Dodaj studenta
        </el-button>
        <el-table :data="studentsData" style="width: 100%">
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
            :data = "studentsData"    
            type="xls"
            name = "filename.xls"
            :meta="tableMeta"
            :param="tableHeaders"
            :fields = "tableFields"
            >
            Exportuj xls
        </download-excel>
        <download-excel
            class = "btn btn-default"
            :data = "studentsData"    
            type="csv"
            name = "filename.csv"
            :meta="tableMeta"
            :param="tableHeaders"
            :fields = "tableFields"
            >
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
import { mapGetters } from 'vuex';

export default {
    components: {
      'downloadExcel': JsonExcel
    },

    data() {
        return {
            tableHeaders : {
                "date": "Data",
                "firstname": "Imię",
                "lastname": "Nazwisko",
                "index": "Index"
            },

            tableFields: {
                "Data": "String",
                "Imię": "String",
                "Nazwisko": "String",
                "Index": "String"
            },

            tableMeta: [
                [
                    {
                        'key': 'charset',
                        'value': 'utf-8'
                    }
                ]
            ],

            titles: [
                'Data i godzina', 'Imię', 'Nazwisko', 'Index'
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

    computed: {
        ...mapGetters([ 
            'studentsData'
        ])
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
                        date: moment().format('DD.MM.YYYY h:mm:ss'),
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
