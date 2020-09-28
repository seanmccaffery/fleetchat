class Users {
  constructor () {
    this.users = []
  }

  addUser(user) {
    this.users.push(user)
  }

  getUser(id) {
    return this.users.find((user) => user.id === id)
  }

  getUsers() {
    return this.users
  }

  removeUser(id) {
    this.users = this.users.filter(user => user.id !== id)
  }
}

module.exports = () => {
  return new Users()
}
