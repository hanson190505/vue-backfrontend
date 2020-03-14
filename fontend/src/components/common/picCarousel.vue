<template>
  <div class="block">
    <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="(item, index) in picUrlList" :key="index">
        <img :src="item" class="car-img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'picCarousel',
  data() {
    return {
      picUrlList: []
    }
  },
  props: {
    proPicUrl: String
  },
  methods: {
    handlePicUrl() {
      if (this.proPicUrl !== undefined) {
        this.proPicUrl.split('|').forEach(el => {
          if (el !== '') {
            this.picUrlList.push(el)
          }
        })
      }
    },
    addPicUrl(picurl) {
      this.picUrlList.push(picurl)
    }
  },
  created() {
    this.handlePicUrl()
  }
}
</script>

<style>
.car-img {
  width: 100%;
}
</style>