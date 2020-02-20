<template>
  <div class="home">
    <el-container>
      <el-header height="60px">
        <!-- Header content -->
        <el-row>
          <!-- logo区 -->
          <el-col :span="3">
            <div class="logo">
              <span>CMS管理系统</span>
            </div>
          </el-col>
          <!-- 导航区 -->
          <el-col :span="14">
            <nav-bar></nav-bar>
          </el-col>
          <!-- 汇率实时显示 -->
          <!-- <el-col :span="4">
            <div class="ex-rate">
              <div class="ex-rate-item">
                <span class="fBuyPri">
                  {{ exData.data1.name }}:现汇买入价:{{
                    (exData.data1.fBuyPri / 100).toFixed(3)
                  }}
                </span>
                <span class="bankConversionPri">
                  中间价:{{ (exData.data1.bankConversionPri / 100).toFixed(3) }}
                </span>
              </div>
              <div class="ex-rate-item">
                <span class="fBuyPri">
                  {{ exData.data2.name }}:现汇买入价:{{
                    (exData.data2.fBuyPri / 100).toFixed(3)
                  }}
                </span>
                <span class="bankConversionPri">
                  中间价:{{ (exData.data2.bankConversionPri / 100).toFixed(3) }}
                </span>
              </div>
              <div class="ex-rate-item">
                <span class="fBuyPri">
                  {{ exData.data3.name }}:现汇买入价:{{
                    (exData.data3.fBuyPri / 100).toFixed(3)
                  }}
                </span>
                <span class="bankConversionPri">
                  中间价:{{ (exData.data3.bankConversionPri / 100).toFixed(3) }}
                </span>
              </div>
            </div>
          </el-col> -->
          <!-- 个人信息区 -->
          <el-col :span="3">
            <div class="userinfo">
              <span class="username">{{ this.$store.getters.name }}</span>
              <el-button type="info" @click="logout" size="medium"
                >退出</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main height>
        <!-- Main content -->
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import navBar from '@/components/navbar'
// import { getExRate } from '@/api/utilsApi'
export default {
  name: 'home',
  components: {
    navBar
  },
  data() {
    return {
      // exData: { data1: { name: '' }, data2: { name: '' }, data3: { name: '' } }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('userInfo/logout')
      this.$router.push('/login')
    }
  },
  created() {
    // getExRate().then(res => {
    //   this.exData = res.data
    // })
  }
  // destroyed() {
  //   window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  // }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #545c64;
  font-size: 20px;
}
.logo {
  line-height: 60px;
  height: 60px;
}
.userinfo {
  line-height: 60px;
  height: 60px;
  float: right;
  .username {
    margin-right: 10px;
    color: aliceblue;
  }
}
.ex-rate {
  font-size: 10px;
  color: aliceblue;
}
.fBuyPri {
  margin-right: 10px;
}
.ex-rate-item {
  margin-top: 3px;
}
</style>
