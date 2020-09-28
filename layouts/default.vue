<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list subheader>
        <v-subheader>Online users ({{ users.length }})</v-subheader>
        <v-list-item
          v-for="u in users"
          :key="u.id"
          @click.prevent
        >
          <v-list-item-action>
            <v-icon :color="user.id === u.id ? '#00BFA5' : 'grey'">mdi-account-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="u.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-btn
        icon
        @click = "exit"
      >
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid style="height: 100%;">
        <v-row class="name-dialog" justify="center">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="400"
          >
            <v-card>
              <v-card-title class="headline py-4">
                Enter your name to join the chat
              </v-card-title>
              <v-text-field :rules="rules" ref="usernameInput" class="px-7" label="Enter your name"></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="submitUser()"
                >
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>Copyright &copy; {{ new Date().getFullYear() }} Sean McCaffery</span>
    </v-footer>
  </v-app>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      dialog: true,
      drawer: true,
      users: [],
      socket: io('http://localhost:3000'),
      rules: [v => !!v || "Text is required"],
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  mounted: function () {
    this.socket.on("updateUsers", (users) => {
      this.users = users
    })
  },
  methods: {
    submitUser() {
      let usernameInput = this.$refs.usernameInput.$el.querySelector('input').value
      if (usernameInput) {
        this.$refs.usernameInput.$el.querySelector('input').value = ''
        this.dialog = false
        let newUser = this.socket.emit("createUser", usernameInput)
        this.$store.commit('setUser', { id: newUser.id, name: usernameInput })
      }
    },
    exit() {
      this.socket.emit('userLeave')
      this.dialog = true
    }
  }
}
</script>
