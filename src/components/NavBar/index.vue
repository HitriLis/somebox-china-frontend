<template lang="pug">
  b-navbar(toggleable="lg" type="dark" variant="info" fixed="top")
    b-navbar-brand(href="/")
      | Yandex
    b-collapse(id="nav-collapse" is-nav)
      b-navbar-nav
        b-nav-item(
          :to="{name: 'order-list'}"
        )
          | Список заказов
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
