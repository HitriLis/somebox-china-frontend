<template lang="pug">
   v-content
     v-container( fluid fill-height)
       v-layout( align-center justify-center)
         v-flex( xs12 sm8 md4)
           v-card( class="elevation-12")
              v-toolbar( dark color="primary")
                v-toolbar-title  Введите свой логин и пароль
              v-card-text
                v-form
                  v-text-field(
                     v-model="email"
                     prepend-icon="person"
                     label="Email"
                     type="text"
                  )
                  v-text-field(
                     v-model="password"
                     id="password"
                     prepend-icon="lock"
                     label="Ведите пароль"
                     type="password"
                  )
              v-card-actions
               v-spacer
               v-btn(
                  color="primary"
                  @click="login"
               ) Войти
</template>
<script>
export default {
  name: 'Login',
  props: {
    source: String
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const email = this.form.email
      const password = this.form.password
      try {
        await this.$store.dispatch('login', { email, password })
        this.$router.push({ path: this.$route.query.redirect || '/' })
      } catch (error) {
        this.error = 'Неверный логин или пароль'
      }
    }
  }
}
</script>
