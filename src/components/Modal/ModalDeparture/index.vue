<template lang="pug">
  b-modal(id="modal-departure" title="Достаавка")
    | {{orders}}
    .datepicker.mb-3
      .datepicker-label
        | Планируемая дата
      b-form-datepicker(
        v-model="plannedDdate"
        :min="new Date()"
        placeholder="Дата"
      )
    template(#modal-footer)
      b-button(
        variant="primary"
        size="sm"
        class="float-right"
        @click="$bvModal.hide('modal-departure')"
      )
        | Закрыть
</template>

<script>
import InputForm from '@/components/Form/InputForm'
export default {
  name: 'ModalDeparture',
  components: {
    InputForm
  },
  props: {
    orders: {
      tepy: Array
    }
  },
  data () {
    return {
      name: '',
      plannedDdate: '',
      actualDate: ''
    }
  }
}
</script>

<style lang="stylus">
.datepicker
  display flex
  align-items center
  &-label
    flex 0 0 auto
    width 150px
    margin-right 10px
    font-weight 600
</style>
