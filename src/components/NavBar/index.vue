<template lang="pug">
  b-navbar(toggleable="lg" type="dark" variant="info" fixed="top")
    b-navbar-brand(href="/")
      | CN-Delivery
    b-collapse(id="nav-collapse" is-nav)
      b-navbar-nav
        b-nav-item(
          :to="{name: 'order-list'}"
        )
          | Список заказов
        b-nav-item(
          :to="{name: 'create-order'}"
        )
          | Добавить заказ
        b-nav-item(
          :to="{name: 'delivery-list'}"
        )
          | Доставка
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
