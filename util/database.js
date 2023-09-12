//Connecting to MySQL Database
const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'node.js',
    password : 'kldpsh7@8447'
})

module.exports = pool.promise()