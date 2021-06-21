<template lang="pug">
  .delivery
    b-card
      b-table(
        striped
        :fields='fields'
        :items="listDelivery"
      )
        <template #cell(data_plan)="data" lang="pug">
          | {{ $moment(data.item.data_plan).format('DD MM YYYY') }}
        </template>
        <template #cell(orders)="data" lang="pug">
          b-card.list-goods(
            v-for="item in data.item.orders"
            :title="item.name"
            :key="item.id"
          )
            b-list-group
              b-list-group-item(
                class="d-flex justify-content-between align-items-center"
                v-for="good in item.goods"
                :key="good.id"
              )
                InfoProduct(
                  :good="good"
                )
                b-icon(
                  icon="exclamation-circle"
                  variant="info"
                  :id="`popover-target-${data.item.id}-${good.id}`"
                )
                b-popover(:target="`popover-target-${data.item.id}-${good.id}`" triggers="hover" placement="top")
                  <template #title>Остаток</template>
                    .popover-info
                      .popover-info__text
                        | Количество:
                      .popover-info__val
                        | {{good.quantity}}
                    .popover-info
                      .popover-info__text
                        | Баланс:
                      .popover-info__val
                        | {{good.balance}}
        </template>
        <template #cell(action)="data" lang="pug">
          b-button(
            variant="danger"
            @click="deleteItem(data.item.id)"
          )
            b-icon(icon="trash")
        </template>
</template>

<script>
import InfoProduct from './InfoProduct'
export default {
  name: 'ListDelivery',
  components: {
    InfoProduct
  },
  data () {
    return {
      listDelivery: [],
      fields: [
        {
          key: 'orders',
          label: 'Состав'
        },
        {
          key: 'data_plan',
          label: 'Планируемая дата',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: 'action',
          label: '',
          tdClass: 'text-right',
          thClass: 'text-right'
        }
      ]
    }
  },
  methods: {
    async deleteItem (id) {
      await this.$store.dispatch('deleteDelivery', id)
      this.loadListDelivery({})
    },
    async loadListDelivery (v) {
      console.log(v)
      this.listDelivery = await this.$store.dispatch('listDelivery', v)
    }
  },
  mounted () {
    this.loadListDelivery({})
  }
}
</script>

<style lang="stylus">
.list-goods
  &:not(:last-child)
    margin-bottom 10px
.popover-info
  display flex
  align-items center
  &__text
    margin-right 10px
    font-weight 500
</style>
