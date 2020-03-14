<template>
  <div id="app">
    <el-button type="primary" @click="descDialogVisible=true">编辑</el-button>
    <el-dialog title :visible.sync="descDialogVisible" width="50%">
      <ckeditor v-model="editorData"></ckeditor>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'richText',
  data() {
    return {
      editorData: '',
      descDialogVisible: false
    }
  },
  methods: {
    submit() {
      this.$emit('submitRichData', this.editorData)
    }
  }
}
</script>