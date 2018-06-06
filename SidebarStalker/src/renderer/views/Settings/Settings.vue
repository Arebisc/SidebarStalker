<template>
    <div class="settings-container__wrapper">
        <el-form ref="settingsForm" :rules="settingsFromRules" :model="settingsForm" >
            <el-form-item prop="cameraPort">
                <label>Port IP</label>
                <el-input v-model="settingsForm.cameraPort" :placeholder="$t('custom.settingsForm.placeholders.cameraPort')"></el-input>
            </el-form-item>
            <el-form-item prop="cameraIp">
                <label>Adres IP</label>
                <el-input v-model="settingsForm.cameraIp" :placeholder="$t('custom.settingsForm.placeholders.cameraIp')"></el-input>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="submitForm">{{ $t('custom.settingsForm.submit') }}</el-button>
                <el-button>{{ $t('custom.settingsForm.cancel') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron';

export default {
    data() {
        return {
            settingsForm: {
                cameraPort: '',
                cameraIp: ''
            }
        }
    },

    created () {
        this.settingsForm.cameraPort = this.$store.getters.settings.cameraPort;
        this.settingsForm.cameraIp = this.$store.getters.settings.cameraIp;
    },

    methods: {
        submitForm() {
            let self = this;
            this.$refs["settingsForm"].validate((valid) => {
                debugger;
                if (valid) {
                    ipcRenderer.send('save-appsettings-request', self.settingsForm);
                    ipcRenderer.on('save-appsettings-response', (event, args) => {
                        self.$store.dispatch('setAppSettings', args);
                    });
                }
            });
        }
    },

    computed: {
        settingsFromRules() {
            return {
                cameraPort: [
                    { required: true, message: this.$t('custom.settingsForm.validators.cameraPortNotEmpty'), trigger: 'blur' }
                ],
                cameraIp: [
                    { required: true, message: this.$t('custom.settingsForm.validators.cameraIpNotEmpty'), trigger: 'blur' }
                ]
            }
        }
    }
}
</script>
<style lang="scss">
@import './Settings.scss';
</style>
