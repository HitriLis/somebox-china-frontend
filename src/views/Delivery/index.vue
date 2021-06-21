<template lang="pug">
  .delivery-page
    b-card(
      title="Оформить доставку"
    )
      | Планируемая дата
      b-form-datepicker(
        :min="new Date()"
        placeholder="Дата"
        @context="onContext"
      )
      b-card.mt-5(
        v-for="item in items"
        :key="item.id"
        :title="item.name"
      )
        b-table.mb-0(
          striped
          :items="item.goods"
          :fields="fields"
          caption-top
          :tbody-tr-class="rowClass"
        )
          <template #cell(select)="data" lang="pug">
            b-form-checkbox(
              v-if="data.item.balance > 0"
              :checked="checkedDelivery.includes(data.item.id)"
              @input="setDeparture(data.item)"
            )
          </template>
          <template #cell(total)="data" lang="pug">
            | {{data.item.quantity}}
          </template>
          <template #cell(balance)="data" lang="pug">
            span(
              v-if="checkedDelivery.includes(data.item.id)"
            )
              | {{deliverySet.find(e => e.id === data.item.id).balance}}
            span(
               v-else
            )
              | {{data.item.balance}}
          </template>
          <template #cell(quantity)="data" lang="pug">
            input.edit-quantity(
              v-if="checkedDelivery.includes(data.item.id)"
              :value="deliverySet.find(e => e.id === data.item.id).value"
              :max="data.item.balance"
              min="0"
              type="number"
              placeholder="Количество"
              @input="setQuantity(data.item.id, $event, data.item.balance)"
            )
            span(
               v-else
            )
              | {{data.item.balance}}
          </template>
          <template #cell(product)="data" lang="pug">
            | {{data.item.product.name}}
          </template>
      <template #footer lang="pug">
        b-button(
          variant="primary"
          @click="createDeparture"
        )
          | Сохранить
      </template>
    | {{deliverySet}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Delivery',
  data () {
    return {
      fields: [
        {
          key: 'select',
          label: '',
          tdClass: 'text-left',
          thClass: 'text-left'
        },
        {
          key: 'product',
          label: 'Товор',
          tdClass: 'text-left',
          thClass: 'text-left'
        },
        {
          key: 'quantity',
          label: 'Количество',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: 'balance',
          label: 'Остаток',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: 'total',
          label: 'Всего единиц',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: 'price',
          label: 'Цена за штуку',
          tdClass: 'text-center',
          thClass: 'text-center'
        }
      ],
      plannedDdate: '',
      deliverySet: []
    }
  },
  computed: {
    ...mapState({
      items: state => state.delivery.delivery
    }),
    checkedDelivery () {
      return this.deliverySet.map(e => e.id)
    }
  },
  methods: {
    onContext (ctx) {
      this.plannedDdate = this.$moment(ctx.selectedDate).toISOString(true)
    },
    createDeparture () {
      const data = {
        orders: this.items.map(e => e.id),
        goods: this.deliverySet,
        data_plan: this.plannedDdate
      }
      console.log(data)
      this.$store.dispatch('createDeparture', data)
    },
    rowClass (item, type) {
      const curentVal = this.deliverySet.find(e => e.id === item.id)?.balance
      if (!item || type !== 'row' || curentVal === undefined) return
      if (item.balance === curentVal) return 'table-danger'
      if (curentVal === 0) return 'table-success'
    },
    setQuantity (id, v, quantity) {
      const val = Number(v.target.value) >= quantity ? quantity : Number(v.target.value)
      this.deliverySet.map(e => {
        console.log(e.balance, val, quantity)
        if (e.id === id) {
          e.balance = e.quantity - val
          e.value = val
        }
        return e
      })
      this.$forceUpdate()
    },
    setDeparture (payload) {
      if (this.checkedDelivery.includes(payload.id)) {
        this.deliverySet = this.deliverySet.filter(e => e.id !== payload.id)
      } else {
        const item = {
          id: payload.id,
          balance: payload.balance,
          quantity: payload.balance,
          value: payload.balance
        }
        this.deliverySet.push(item)
      }
    }
  }
}
</script>

<style lang="stylus">
.edit-quantity
  max-width 100px
  margin 0 auto
  color #495057
  background-color #fff
  background-clip padding-box
  border 1px solid #ced4da
  border-radius .25rem
  outline 0
</style>
