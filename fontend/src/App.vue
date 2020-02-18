<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    // beforeunloadFn(e) {
    //   console.log('刷新或关闭')
    // }
    setId() {
      window.sessionStorage.setItem('id', this.$store.getters.id)
    },
    reId() {
      window.sessionStorage.removeItem('id')
    }
  },
  beforeCreate() {},
  created() {
    if (window.sessionStorage.getItem('id') !== '0') {
      this.$store
        .dispatch('userInfo/userSet', window.sessionStorage.getItem('id'))
        .then(res => {
          this.reId()
        })
    }
    window.addEventListener('beforeunload', () => {
      window.sessionStorage.setItem('id', this.$store.getters.id)
    })
  }
}
</script>

<style></style>
