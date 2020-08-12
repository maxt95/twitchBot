const tmi = require('tmi.js')
require('dotenv').config()

const options = {
  identity: {
    username: process.env.username,
    password: process.env.password,
  },
  channels: [process.env.channels]
}

const client = new tmi.client(options)

const onMessageHandler = (target, context, msg, self) => {
  if (self) { return }

  const commandName = msg.trim()

  if(commandName === '!test') {
    client.say(target, 'this is a test')
    console.log('executed command: test')
  } else {
    console.log('Unknown command')
  }
}

const onConnectedHandler = () => {
  console.log('connected')
}

client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

client.connect()