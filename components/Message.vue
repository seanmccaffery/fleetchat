<template>
  <v-row justify="center" no-gutters>
    <v-col class="msg-wrapper">
      <v-card class="msg mb-6 rounded light" :class="{ owner }">
        <v-card-title>{{ message.name }}</v-card-title>
        <v-card-text class="body-1 text--primary">{{ message.text }}<span class="subtitle-2 text--secondary float-right">{{ message.time }}</span></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => {},
    },
    owner: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg {
  width: 60%;
  background: #2196F3;
  color: #fff;
}

.owner {
  background: #00BFA5;
  color: #fff;
  align-self: flex-end;
}
</style>
