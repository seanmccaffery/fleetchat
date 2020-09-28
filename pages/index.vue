<template>
  <div class="chat-wrapper">
    <div class="chat">
      <Message
        v-for="(message, index) in messages"
        :message="message"
        :owner="message.owner == user.id"
      />
    </div>
    <div class="chat-form">
      <ChatForm :user="user ? user : {}" />
    </div>
</div>

</template>

<script>
import Message from "@/components/Message"
import ChatForm from "@/components/ChatForm"
import io from 'socket.io-client'
import { mapState } from 'vuex'

export default {
  components: {
    Message,
    ChatForm
  },
  computed: mapState({
    user: state => state.user
  }),
  data: () => ({
    messages: [],
    socket: io('http://localhost:3000')
  }),
  mounted: function () {
    this.socket.on("newMessage", (msg) => {
      this.messages.push(msg)
    })
  }
}
</script>

<style scoped>
.chat-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}

.chat-form {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 1rem;
  height: 80px;
}
</style>
