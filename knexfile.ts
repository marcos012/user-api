const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        useNullAsDefault: true,
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
    }
};
