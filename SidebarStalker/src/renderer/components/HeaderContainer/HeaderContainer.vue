<template>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">{{ $t('custom.header.studentsTable') }}</el-menu-item>
  <el-submenu index="2">
    <template slot="title">{{ $t('custom.header.export') }}</template>
    <el-menu-item index="2-1">
        <download-excel
            class = "btn btn-default"
            :data = "studentsData"    
            type="csv"
            name = "filename.csv"
            :meta="tableMeta"
            :param="tableHeaders"
            :fields = "tableFields"
            >
            {{ $t('custom.header.exportCSV') }}
        </download-excel>
    </el-menu-item>
    <el-menu-item index="2-2">
        <download-excel
            class = "btn btn-default"
            :data = "studentsData"    
            type="xls"
            name = "filename.xls"
            :meta="tableMeta"
            :param="tableHeaders"
            :fields = "tableFields"
            >
            {{ $t('custom.header.exportXLS') }}
        </download-excel>
    </el-menu-item>
  </el-submenu>
</el-menu>
</template>
<script>
import JsonExcel from 'vue-json-to-excel/JsonExcel';
import { mapGetters } from 'vuex';


export default {
    components: {
      'downloadExcel': JsonExcel
    },

     data() {
      return {
        activeIndex: '1',

        activeIndex2: '1',

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
      };
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },

    computed: {
        ...mapGetters([ 
            'studentsData'
        ])
    },
}
</script>
<style lang="scss" scoped>
@import './HeaderContainer.scss';
</style>
