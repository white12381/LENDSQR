const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "us-cdbr-east-06.cleardb.net",
    // port: 3306,
    user: "b7b73008dce829",
    database: "heroku_a9294397af524d2",
      password : '7205d18b'
  },
});
module.exports = knex;
 