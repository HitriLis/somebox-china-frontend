<template lang="pug">
.home-page
  b-card
    <template #header lang="pug">
      .home-page__header
        h3 Заказы
        b-button.mr-2(
          :disabled="!orderSelect.length"
          variant="info"
          :to="{name: 'delivery'}"
        )
          | Доставка
    </template>
    <template #footer lang="pug" v-if="total>10">
      Paginator(
        :total="total"
        @currentPage="currentPage"
        @limitList="limitList"
        v-model="count"
      )
    </template>
    b-table(
      striped
      :fields='fields'
      :items="orders"
    )
      <template #cell(data_create)="data" lang="pug">
        | {{ $moment(data.item.data_create).format('DD MM YYYY') }}
      </template>
      <template #cell(customer)="data" lang="pug">
        | {{data.item.customer.name}}
      </template>
      <template #cell(completed)="data" lang="pug">
        ProgressBar(
          :progress="completedOrder(data.item.goods)"
        )
      </template>
      <template #cell(select)="data" lang="pug">
        b-form-checkbox(
          :key="data.item.id"
          :checked="checkedOrder.includes(data.item.id)"
          @input="setDeparture(data.item)"
          :disabled="completedOrder(data.item.goods) === 100"
        )
      </template>
      <template #cell(provider)="data" lang="pug">
        | {{data.item.provider.name}}
      </template>
      <template #cell(sum)="data" lang="pug">
        | {{ sumCalc(data.item.goods) }}
      </template>
      <template #cell(action)="data" lang="pug">
        b-button(
          variant="danger"
          @click="deleteOrder(data.item.id)"
        )
          b-icon(icon="trash")
      </template>
      <template #cell(name)="data" lang="pug">
        b-button(
          variant="link"
          :to="{name: 'order', params: { id: data.item.id }}"
        )
          | {{data.item.name}}
      </template>
  ModalDeparture(
    :orders="orderSelect"
  )
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Paginator from '@/components/Paginator'
import ModalDeparture from '@/components/Modal/ModalDeparture'
import ProgressBar from '@/components/ProgressBar'

export default {
  name: 'Home',
  components: {
    Paginator,
    ModalDeparture,
    ProgressBar
  },
  data () {
    return {
      fields: [
        {
          key: 'select',
          label: '',
          tdClass: 'text-center align-middle',
          thClass: 'text-center align-middle'
        },
        {
          key: 'name',
          label: 'Заказ',
          tdClass: 'text-center align-middle',
          thClass: 'text-center align-middle'
        },
        {
          key: 'provider',
          label: 'Поставщик',
          tdClass: 'text-center align-middle',
          thClass: 'text-center align-middle'
        },
        {
          key: 'customer',
          label: 'Клиент',
          tdClass: 'text-center align-middle',
          thClass: 'text-center align-middle'
        },
        {
          key: 'sum',
          label: 'Сумма',
          tdClass: 'text-center align-middle',
          thClass: 'text-center align-middle'
        },
        {
          key: 'data_create',
          label: 'Создан',
          tdClass: 'text-center align-middle',
          thClass: 'text-center align-middle'
        },
        {
          key: 'completed',
          label: 'Завершено',
          tdClass: 'text-center align-middle',
          thClass: 'text-center align-middle'
        },
        {
          key: 'action',
          label: '',
          tdClass: 'text-right align-middle',
          thClass: 'text-right align-middle'
        }
      ],
      orderSelect: [],
      count: 1,
      orders: []
    }
  },
  computed: {
    ...mapState({
      total: state => state.order.total
    }),
    checkedOrder () {
      return this.orderSelect.map(e => e.id)
    }
  },
  methods: {
    ...mapMutations({
      setDelivery: 'SET_DELIVERY'
    }),
    completedOrder (goods) {
      const balance = goods.reduce((result, curentItem) => {
        result += curentItem.balance
        return result
      }, 0)
      const quantity = goods.reduce((result, curentItem) => {
        result += curentItem.quantity
        return result
      }, 0)
      const total = ((quantity - balance) / quantity) * 100
      return Math.round(total * 100) / 100
    },
    setDeparture (item) {
      if (this.checkedOrder.includes(item.id)) {
        this.orderSelect = this.orderSelect.filter(e => e.id !== item.id)
      } else {
        this.orderSelect.push(item)
      }
      this.setDelivery(this.orderSelect)
    },
    sumCalc (goods) {
      return goods.reduce((total, curent) => {
        total = curent.quantity * curent.price
        return total
      }, 0)
    },
    currentPage (v) {
      this.loadOrder(v)
    },
    limitList (v) {
      this.loadOrder(v)
    },
    async loadOrder (v) {
      this.orders = await this.$store.dispatch('getListOreder', v)
    },
    async deleteOrder (id) {
      await this.$store.dispatch('deleteOrder', id)
      this.loadOrder({})
    }
  },
  mounted () {
    this.loadOrder({})
  }
}
</script>

<style lang="stylus">
.home-page
  &__header
    display flex
    justify-content space-between
    align-items center
</style>
