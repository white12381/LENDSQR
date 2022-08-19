const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "us-cdbr-east-06.cleardb.net",
    port: 3306,
    user: "b36312e1b6e987",
    database: "heroku_4c19371dc74f806",
      password : 'aad7a27f'
  },
});
module.exports = knex;
// mysql://b36312e1b6e987:aad7a27f@us-cdbr-east-06.cleardb.net/heroku_4c19371dc74f806?reconnect=true/