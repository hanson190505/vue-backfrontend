<template>
  <div>
    <el-button type="primary" @click="picdialogVisible=true" size="mini">+</el-button>
    <el-dialog title :visible.sync="picdialogVisible" width="50%">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="actionUrl"
        :on-success="uploadSuccess"
        :file-list="fileList"
        :limit="1"
        :data="uploadData"
        accept="image/jpg, image/jpeg, image/png"
        :auto-upload="false"
        :on-exceed="handleExceed"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadBtn">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'uploadPic',
  props: {
    owner: String,
    index: {
      type: Number,
      default: 99
    },
    number: {
      type: String,
      default: 'default'
    },
    is_home: {
      type: Number,
      default: 0
    },
    home_index: {
      type: Number,
      default: 0
    },
    is_banner: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      picdialogVisible: false,
      actionUrl: process.env.VUE_APP_ACTION_URL,
      fileList: [],
      //图片上传附加数据
      uploadData: {
        token: window.localStorage.getItem('token'),
        owner: this.owner,
        number: this.number,
        is_home: this.is_home,
        home_index: this.home_index,
        is_banner: this.is_banner
      }
    }
  },
  methods: {
    //图片上传成功后的返回结果
    uploadSuccess(res) {
      switch (res.status) {
        case 1000:
          this.$message('上传成功')
          this.$emit(
            'sendPicUrl',
            process.env.VUE_APP_API_PIC_URL + res.file,
            this.index
          )
          break
        case 1001:
          this.$message.error('图片尺寸太大,请选择500kb以下的图片')
          break
        case 1002:
          this.$message.error('非法的文件格式,或图片已损坏')
          break
        case 1003:
          this.$message('找到相同的图片')
          this.$emit(
            'sendPicUrl',
            process.env.VUE_APP_API_PIC_URL + res.file,
            this.index
          )
        default:
          break
      }
    },
    //超出文件数量控制
    handleExceed() {
      this.$message.error('单次只能上传一张图片')
    },
    //上传图片前控制
    uploadBtn() {
      if (this.number === '') {
        this.$message.error('请完整填写订单信息!')
      } else {
        this.uploadData.number = this.number
        this.$refs.upload.submit()
      }
    }
  }
}
</script>

<style>
</style>