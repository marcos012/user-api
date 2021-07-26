import knex from 'knex';

// const environment = process.env.ENVIRONMENT || 
const config = require('../../knexfile')['development'];

const connection = knex(config);

export default connection;
