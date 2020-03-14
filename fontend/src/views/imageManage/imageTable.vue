<template>
  <div>
    <el-row>
      <el-col :span="4">
        <backend-searchVue @parentMethod="pagination"></backend-searchVue>
      </el-col>
      <el-col :span="6">
        <date-search @dateSearchDate="dateSearchDate"></date-search>
      </el-col>
    </el-row>
    <el-table :data="imageData" border stripe>
      <el-table-column label="编号" align="center" width="60" fiexd>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传日期" align="center" width="120" fiexd>
        <template slot-scope="scope">
          <span>{{ scope.row.up_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属" align="center" width="80" fiexd>
        <template slot-scope="scope">
          <span>{{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="首页展示" align="center" width="80" fiexd>
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.is_edit === 1"
            v-model="scope.row.is_home"
          ></el-input>
          <span v-else>{{ scope.row.is_home }}</span>
        </template>
      </el-table-column>
      <el-table-column label="首页顺序" align="center" width="80" fiexd>
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.is_edit === 1"
            v-model="scope.row.home_index"
          ></el-input>
          <span v-else>{{ scope.row.home_index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="banner" align="center" width="80" fiexd>
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.is_edit === 1"
            v-model="scope.row.is_banner"
          ></el-input>
          <span v-else>{{ scope.row.is_banner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center" width="300" fiexd>
        <template slot-scope="scope">
          <img
            :src="baseurl + scope.row.path"
            :alt="scope.row.path"
            class="image"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="handleDel(scope.row)" type="text" size="mini"
            >删除</el-button
          >
          <el-button
            @click="handleChange(scope.row)"
            type="text"
            size="mini"
            v-show="scope.row.is_edit === 0"
            >修改</el-button
          >
          <el-button
            @click="handleSave(scope.row)"
            type="text"
            size="mini"
            v-show="scope.row.is_edit === 1"
            >保存</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagi-nation
      @pagination="pagination"
      :getDataTotal="dataTotal"
    ></pagi-nation>
  </div>
</template>

<script>
import pagiNation from '@/components/common/pagiNation'
import dateSearch from '@/components/common/dateSearch'
import backendSearchVue from '@/components/common/backendSearch.vue'
import { getImages, delImage, patchImage } from '@/api/image'
export default {
  name: 'imageTable',
  components: {
    pagiNation,
    backendSearchVue,
    dateSearch
  },
  data() {
    return {
      imageData: [],
      dataTotal: 0,
      baseurl: process.env.VUE_APP_API_PIC_URL
    }
  },
  methods: {
    //日期搜索
    dateSearchDate(value) {
      if (!value) {
        this.pagination()
      } else {
        this.pagination({
          start_date: value[0],
          end_date: value[1],
          argument: 'date_search'
        })
      }
    },
    pagination(params) {
      //子组件backendSearch清空搜索条件时调用,设定page默认值为1
      if (!params) {
        params = { page: 1, page_size: 10 }
      }
      getImages(params).then(res => {
        this.loading = false
        this.imageData = res.data.results
        this.dataTotal = res.data.count
      })
    },
    handleDel(row) {
      delImage(row.id).then(res => {
        this.pagination()
      })
    },
    handleChange(row) {
      row.is_edit = 1
    },
    handleSave(row) {
      row.is_edit = 0
      patchImage(row, row.id).then(res => {
        this.pagination()
      })
    }
  },
  created() {
    this.pagination()
  }
}
</script>

<style>
.image {
  width: 300px;
}
</style>
