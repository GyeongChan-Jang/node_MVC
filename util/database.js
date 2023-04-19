const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  datebase: 'node-complete',
  password: 'nodecomplte'
})

module.exports = poll.promise()