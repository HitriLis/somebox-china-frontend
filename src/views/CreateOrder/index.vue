<template lang="pug">
  .create-oreder
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
        placeholder="Наименование"
        label="Наименование заказа"
      )
      InputForm(
        v-model="number"
        placeholder="Номер"
        label="Номер заказа"
      )
      multiselect.mb-3(
        v-model="customer"
        :options="customerOptions"
        label="name",
        track-by="id",
        placeholder="Клиент",
        :searchable="true",
        :loading="productLoading",
        :internal-search="false",
        :max-height="600",
        @open="getCustomer"
        @search-change="getCustomer"
      )
      multiselect(
        v-model="provider"
        :options="providerOptions"
        label="name",
        track-by="id",
        placeholder="Поставщик",
        :searchable="true",
        :loading="productLoading",
        :internal-search="false",
        :max-height="600",
        @open="getProvider"
        @search-change="getProvider"
      )
      .goods-list.mt-5
        b-card
          <template #header lang="pug">
            .goods-header
              h3.mb-0 Состав заказа
          </template>
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
                b-icon.add-button(icon="plus-square"  variant="info" scale="2" @click="addProduct")
            </template>
        b-table(
          v-if="goods.length"
          striped
          :items="goods"
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
              b-button.btn-sm(
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
  name: 'CreateOrder',
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
      customer: null,
      customerOptions: [],
      productOptions: [],
      productLoading: false,
      name: '',
      number: '',
      sum: '',
      goods: [],
      good: {
        price: '',
        product: null,
        quantity: ''
      }
    }
  },
  methods: {
    async save () {
      if (!this.name || !this.number || !this.provider || !this.customer || !this.goods.length) {
        this.$notify({
          type: 'error',
          text: 'Заполните все поля!'
        })
        return
      }
      try {
        const data = {
          name: this.name,
          number: this.number,
          provider: this.provider.id,
          customer: this.customer.id,
          goods: this.goods.map(e => {
            return {
              ...e,
              product: e.product.id
            }
          })
        }
        await this.$store.dispatch('addOreder', data)
        this.$notify({
          type: 'success',
          text: 'Изменения сохранены!'
        })
      } catch {
        this.$notify({
          type: 'error',
          text: 'Произошла ошибка!'
        })
      }
    },
    addProduct () {
      const data = {
        price: this.good.price,
        product: this.good?.product,
        quantity: this.good.quantity
      }
      this.goods.push(data)
      const clear = {
        price: '',
        product: null,
        quantity: ''
      }
      this.good = clear
    },
    deleteProduct (id) {
      this.goods = this.goods.filter(e => e.id !== id)
    },
    async getProvider (name) {
      this.productLoading = true
      this.providerOptions = await this.$store.dispatch('getProvider', name)
      this.productLoading = false
    },
    async getCustomer (name) {
      this.productLoading = true
      this.customerOptions = await this.$store.dispatch('getCustomer', name)
      this.productLoading = false
    },
    async getProducts (name) {
      this.productLoading = true
      this.productOptions = await this.$store.dispatch('getProducts', name)
      this.productLoading = false
    }
  }
}
</script>

<style lang="stylus">
.add-button
  cursor pointer
</style>
