const app = require("express")()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const Message = require("../models/Message")()
const users = require("../models/Users")()

io.on('connection', socket => {
  const socketId = socket.id

  socket.on('createUser', (username) => {
    let user = {
      id: socketId,
      name: username
    }
    users.addUser(user)
    io.emit('updateUsers', users.getUsers())

    return user
  });

  socket.on('createMessage', (msg) => {
    io.emit('newMessage', new Message(msg.owner, msg.name, msg.text))
  });

  socket.on('userLeave', () => {
    const user = users.getUser(socketId)
    if (!user) return
    users.removeUser(user.id)
    io.emit('updateUsers', users.getUsers())
  });
})

module.exports = {
  app,
  http
}
