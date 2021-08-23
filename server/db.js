const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '2464819a',
    host: 'localhost',
    port: 5432,
    database:"library_fund"
});


module.exports =pool;