<template lang="pug">
    v-app
      NavBar
      b-container.app-content(fluid)
        router-view
      notifications(position="bottom left")
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'Layout',
  components: {
    NavBar
  }
}
</script>
