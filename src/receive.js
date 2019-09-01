#!/usr/bin/env node

const amqp = require('amqplib/callback_api')
const amqplib = require('amqplib')

const opt = { credentials: amqplib.credentials.plain('rabbitmq', 'rabbitmq') }

const QUEUE_NAME = 'rabbitmq-redux-logger'

// amqp.connect('amqp://rabbitmq:15672', opt, function (error0, connection) {
// amqp.connect('amqp://rabbitmq', opt, function (error0, connection) { // <--- if in docker container
amqp.connect('amqp://localhost', opt, function (error0, connection) {
  if (error0) {
    throw error0
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1
    }

    channel.assertQueue(QUEUE_NAME, {
      durable: false
    })

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', QUEUE_NAME)

    channel.consume(QUEUE_NAME, function (msg) {
      console.log(' [x] Received %s', msg.content.toString())
    }, {
      noAck: true
    })
  })
})
