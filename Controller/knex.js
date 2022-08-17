const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "lendsqr",
    //   password : 'my_database_password'
  },
});
module.exports = knex;
