<template lang="pug">
    b-progress(:value="progress" max="100" precision="2" :variant="variant" show-progress)
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  computed: {
    variant () {
      let val
      switch (true) {
        case this.progress <= 20:
          val = 'danger'
          break
        case this.progress <= 50:
          val = 'warning'
          break
        case this.progress <= 99.99:
          val = 'primary'
          break
        default:
          val = 'success'
          break
      }
      return val
    }
  }
}
</script>
