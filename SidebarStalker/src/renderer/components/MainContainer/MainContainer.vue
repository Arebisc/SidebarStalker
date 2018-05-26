<template>
    <div class="main-container__wrapper">
        <el-button type="primary" @click="addStudentFormVisibility = true">
            {{ $t('custom.studentForm.addStudent') }}
        </el-button>
        <el-table :data="studentsData" style="width: 100%">
            <el-table-column
                prop="date"
                :label="$t('custom.studentForm.date')">
            </el-table-column>
            <el-table-column
                prop="firstname"
                :label="$t('custom.studentForm.firstname')">
            </el-table-column>
            <el-table-column
                prop="lastname"
                :label="$t('custom.studentForm.lastname')">
            </el-table-column>
            <el-table-column
                prop="index"
                :label="$t('custom.studentForm.index')">
            </el-table-column>
        </el-table>

        <el-dialog
            :title="$t('custom.studentForm.addStudent')"
            :visible.sync="addStudentFormVisibility"
            width="30%">

            <el-form ref="addStudentForm" :rules="addStudentFormRules" :model="addStudentForm" >
                <el-form-item prop="firstName">
                    <el-input v-model="addStudentForm.firstName" :placeholder="$t('custom.studentForm.placeholders.firstname')"></el-input>
                </el-form-item>
                <el-form-item prop="lastName">
                    <el-input v-model="addStudentForm.lastName" :placeholder="$t('custom.studentForm.placeholders.lastname')"></el-input>
                </el-form-item>
                <el-form-item prop="index">
                    <el-input v-model="addStudentForm.index" :placeholder="$t('custom.studentForm.placeholders.index')"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">{{ $t('custom.studentForm.reset') }}</el-button>
                <el-button type="primary" @click="submitForm"> {{ $t('custom.studentForm.add') }}</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { ipcRenderer } from 'electron';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {

            addStudentFormVisibility: false,

            addStudentForm: {
                firstName: "",
                lastName: "",
                index: ""
            },

            addStudentFormRules: {
                firstName: [
                    { required: true, message: this.$t('custom.studentForm.validators.firstnameNotEmpty'), trigger: 'blur' }
                ],
                lastName: [
                    { required: true, message: this.$t('custom.studentForm.validators.lastnameNotEmpty'), trigger: 'blur' },
                ],
                index: [
                    { required: true, message: this.$t('custom.studentForm.validators.indexNotEmpty'), trigger: 'blur' },
                    { min: 1, max: 10, message: this.$t('custom.studentForm.validators.indexLenght'), trigger: 'blur' }
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

                    this.$store.dispatch('addStudentToList', student);
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
