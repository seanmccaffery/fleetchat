class Message {
  constructor (id, name, text) {
    this.owner = id
    this.name = name
    this.text = text
    this.time = new Date().toString().slice(15, 24)
  }
}

module.exports = () => {
  return Message
}
