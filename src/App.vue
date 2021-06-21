<template lang="pug">
  div(id="app")
    NavBar
    b-container.app-content(fluid)
      router-view
    notifications(position="bottom left")
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'Home',
  components: {
    NavBar
  }
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
