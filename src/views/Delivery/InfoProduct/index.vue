<template lang="pug">
  .info-good
    .info-good__values
      | Наименовани:
      span
        | {{good.product.name}}
    .info-good__values
      | Создан:
      span
        | {{ $moment(good.product.data_create).format('DD MM YYYY') }}
    .info-good__values
      | Артикул:
      span
        | {{good.product.article}}
    .info-good__values
      | Штрихкод:
      span
        | {{good.product.barcode}}
</template>

<script>
export default {
  name: 'InfoProduct',
  props: {
    good: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="stylus">
.info-good
  &__values
    font-weight 600
    span
      padding 0 10px
      font-weight normal
</style>
