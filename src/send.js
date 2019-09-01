#!/usr/bin/env node

const amqp = require('amqplib/callback_api')
const amqplib = require('amqplib')

const opt = { credentials: amqplib.credentials.plain('rabbitmq', 'rabbitmq') }

const QUEUE_NAME = 'rabbitmq-redux-logger'

amqp.connect('amqp://localhost', opt, (error0, connection) => {
  // console.log(Object.keys(connection))
  if (error0) {
    throw error0
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1
    }

    const msg = 'Hello World!'

    channel.assertQueue(QUEUE_NAME, {
      durable: false
    })
    channel.sendToQueue(QUEUE_NAME, Buffer.from(msg))

    console.log(' [x] Sent %s', msg)
  })
  setTimeout(function () {
    connection.close()
    process.exit(0)
  }, 500)
})
