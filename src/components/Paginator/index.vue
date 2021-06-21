<template lang="pug">
  .paginator
    b-pagination(
      v-model="currentPage"
      :total-rows="total"
      :per-page="selected"
    )
    .paginator-limit
      b-form-select(
        v-model="selected"
        :options="options"
        class="form-control form-control-sm font-weight-bold mr-4 border-0 bg-light false"
      )
    .paginator-limit__info
      | Показаны строки с {{infoCurrent}} по {{infoNext}} из {{total}}
</template>

<script>
export default {
  name: 'Paginator',
  data () {
    return {
      currentPage: 1,
      selected: 10,
      options: [
        {
          value: 10,
          text: 10
        },
        {
          value: 25,
          text: 25
        },
        {
          value: 50,
          text: 50
        }
      ]
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    infoCurrent () {
      return this.currentPage > 1
        ? (this.currentPage - 1) * this.selected + 1
        : this.currentPage
    },
    infoNext () {
      const currentTotal = this.currentPage * this.selected
      return currentTotal > this.total ? this.total : currentTotal
    }
  },
  watch: {
    currentPage (v) {
      this.$emit('currentPage', { page: v, limit: this.selected })
      this.$emit('input', (this.currentPage - 1) * this.selected + 1)
    },
    selected (v) {
      this.$emit('limitList', { limit: v })
      this.$emit('input', (this.currentPage - 1) * this.selected + 1)
    }
  }
}
</script>

<style lang="stylus">
.paginator
  display flex
  justify-content space-between
  align-items center
  ul
    margin 0
  &-limit
    display flex
    align-items center
    &__info
      flex 0 0 auto
</style>
