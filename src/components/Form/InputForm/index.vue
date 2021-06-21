<template lang="pug">
  .input-form
    .input-form-label
      | {{label}}
    b-form-input(
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
      :type="type",
      :min="min"
    )
</template>

<script>
export default {
  name: 'InputForm',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
  .input-form
    display flex
    align-items center
    &:not(:last-child)
      margin-bottom 20px
    &-label
      flex 0 0 auto
      width 150px
      font-weight 600
      margin-right 10px
</style>
