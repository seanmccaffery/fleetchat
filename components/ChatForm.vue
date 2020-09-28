<template>
  <v-form
    ref="form"
    @submit.prevent="send"
  >
    <v-text-field
      v-model="text"
      label="Message..."
      outlined
      :rules="rules"
      append-icon="mdi-send-circle-outline"
      @click:append="send"
      @blur="resetValidation"
    />
  </v-form>
</template>

<script>

export default {
  props: {
    user: '',
  },
  data: () => ({
    text: "",
    rules: [v => !!v || "Text is required"],
  }),
  methods: {
    send() {
      if (this.$refs.form.validate()) {
        this.$socket.emit('createMessage', { owner: this.user.id, name: this.user.name, text: this.text });
        this.text = ""
        this.resetValidation()
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
