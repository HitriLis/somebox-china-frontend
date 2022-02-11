<template lang="pug">
  div(id="app")
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  display flex
  flex-direction column
  width 100vw
  height 100vh
.app-content
  display flex
  flex-direction column
  flex 1 1 auto
  padding-top 70px
</style>
