<template lang="pug">
  b-card(
    :title="name"
  )
    <template #footer lang="pug">
      b-button(
        variant="info"
        @click="save"
      )
        | Сохранить
    </template>
    InputForm(
      v-model="name"
      placeholder="Enter your name"
      label="Наименование заказа"
    )
    InputForm(
      v-model="number"
      placeholder="Enter your name"
      label="Номер заказа"
    )
    multiselect.mb-3(
      v-model="customer"
      :options="customerOptions"
      label="name",
      track-by="id",
      placeholder="Клиент",
      :searchable="true",
      :loading="customerLoading",
      :internal-search="false",
      :max-height="600",
      @open="getCustomer"
      @search-change="getCustomer"
    )
      template(v-slot:noResult)
        | Ничего не найдено
      template(v-slot:noOptions)
        | Cписок пуст
    multiselect(
      v-model="provider"
      :options="providerOptions"
      label="name",
      track-by="id",
      placeholder="Поставщик",
      :searchable="true",
      :loading="providerLoading",
      :internal-search="false",
      :max-height="600",
      @open="getProvider"
      @search-change="getProvider"
    )
      template(v-slot:noResult)
        | Ничего не найдено
      template(v-slot:noOptions)
        | Cписок пуст
    .goods-list.mt-5(
      v-if="(order || {}).goods"
    )
      b-card
        <template #header lang="pug">
          .goods-header
            h3.mb-0 Состав заказа
            b-button(
              variant="info"
              v-b-toggle.collapse-1-inner
            )
              | Добавить товар
        </template>
        b-collapse.mb-4(
          id="collapse-1-inner"
        )
          b-card
            InputForm(
              v-model="good.quantity"
              label="Количество"
              type="number"
              min="0"
            )
            InputForm(
              v-model="good.price"
              label="Цена"
              type="number"
              min="0"
            )
            multiselect(
              v-model="good.product"
              :options="productOptions"
              label="name",
              track-by="id",
              placeholder="Выберите товар",
              :searchable="true",
              :loading="productLoading",
              :internal-search="false",
              :max-height="600",
              @open="getProducts"
              @search-change="getProducts"
            )
              template(v-slot:noResult)
                | Ничего не найдено
              template(v-slot:noOptions)
                | Cписок пуст
            <template #footer lang="pug">
              b-button(
                variant="info"
                @click="addProduct"
              )
                | Добавить
            </template>
        b-table(
          striped
          :items="order.goods"
          :fields="fields"
        )
          <template #cell(num)="data" lang="pug">
            | {{data.index + 1}}
          </template>
          <template #cell(product)="data" lang="pug">
            | {{data.item.product.name}}
          </template>
          <template #cell(article)="data" lang="pug">
            | {{data.item.product.article}}
          </template>
          <template #cell(barcode)="data" lang="pug">
            | {{data.item.product.barcode}}
          </template>
          <template #cell(action)="data" lang="pug">
              b-button(
                variant="danger"
                @click="deleteProduct(data.item.id)"
              )
                b-icon(icon="trash")
          </template>
</template>

<script>
import InputForm from '@/components/Form/InputForm'
import Multiselect from 'vue-multiselect'
export default {
  name: 'Order',
  components: {
    InputForm,
    Multiselect
  },
  data () {
    return {
      fields: [
        {
          key: 'num',
          label: ''
        },
        {
          key: 'product',
          label: 'Название',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: 'quantity',
          label: 'Количество',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: 'price',
          label: 'Цена',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: 'article',
          label: 'Артикул',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: 'barcode',
          label: 'Штрихкод',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          key: 'action',
          label: '',
          tdClass: 'text-center',
          thClass: 'text-center'
        }
      ],
      provider: null,
      providerOptions: [],
      providerLoading: false,
      customer: null,
      customerOptions: [],
      customerLoading: false,
      productOptions: [],
      productLoading: false,
      name: '',
      number: '',
      sum: '',
      order: null,
      good: {
        price: '',
        product: null,
        quantity: ''
      }
    }
  },
  methods: {
    async deleteProduct (idProduct) {
      const id = this.$route.params.id
      const product = idProduct
      this.order = await this.$store.dispatch('deleteProduct', { id, product })
    },
    async addProduct () {
      if (!this.good.price || !this.good.product || !this.good.quantity) {
        this.$notify({
          type: 'error',
          text: 'Заполните все поля!'
        })
        return
      }
      const id = this.$route.params.id
      try {
        const data = {
          price: this.good.price,
          product: this.good?.product?.id,
          quantity: this.good.quantity
        }
        this.order = await this.$store.dispatch('addProduct', { id, data })
        this.$notify({
          type: 'success',
          text: 'Изменения сохранены!'
        })
        const clear = {
          price: '',
          product: null,
          quantity: ''
        }
        this.good = clear
      } catch {
        this.$notify({
          type: 'error',
          text: 'Произошла ошибка'
        })
      }
    },
    async getProvider (name) {
      this.providerLoading = true
      this.providerOptions = await this.$store.dispatch('getProvider', name)
      this.providerLoading = false
    },
    async getCustomer (name) {
      this.customerLoading = true
      this.customerOptions = await this.$store.dispatch('getCustomer', name)
      this.customerLoading = false
    },
    async getProducts (name) {
      this.productLoading = true
      this.productOptions = await this.$store.dispatch('getProducts', name)
      this.productLoading = false
    },
    async save () {
      if (!this.name || !this.number || !this.provider || !this.customer) {
        this.$notify({
          type: 'error',
          text: 'Заполните все поля!'
        })
        return
      }
      try {
        const id = this.$route.params.id
        const data = {
          name: this.name,
          sum: this.sum,
          number: this.number,
          provider: this.provider.id,
          customer: this.customer.id
        }
        await this.$store.dispatch('saveOreder', { data, id })
        this.$notify({
          type: 'success',
          text: 'Изменения сохранены!'
        })
      } catch {
        this.$notify({
          type: 'error',
          text: 'Произошла ошибка'
        })
      }
    }
  },
  async mounted () {
    const id = this.$route.params.id
    this.order = await this.$store.dispatch('getOreder', id)
    this.name = this.order.name
    this.sum = this.order.sum
    this.number = this.order.number
    this.provider = this.order.provider
    this.customer = this.order.customer
  }
}
</script>

<style lang="stylus">
.list-action
  display flex
  justify-content space-between
  align-items center
  margin-bottom 10px
  &__title
    font-weight 600
  &__button
    display flex
    align-items center
    button
      border 0
      outline  0
      background transparent
.goods
  &-list__title
    font-weight 600
    margin-bottom 10px
  &-header
    display flex
    align-items center
    justify-content space-between
</style>
