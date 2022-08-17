const bcrypt = require("bcrypt");
const knex = require("../Controller/knex");
const { Random } = require("random-js");
const random = new Random();
const CreateAccount = (res, req) => {
  var body = "";
  var data;
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", function () {
    var datas = JSON.parse(body);
    let { FullName } = datas;
    let { Age } = datas;
    let { Address } = datas;
    let { Email } = datas;
    let { Password } = datas;
    let { UserName } = datas;
    let AccountNumber = random.integer(1000000000, 9999999999).toString();
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(Password, salt);

    knex
      .transaction(function (trx) {
        return trx
          .insert(
            {
              FullName: FullName,
              Address: Address,
              Age: Age,
              Email: Email,
              Password: hash,
              UserName: UserName,
            },
            "id"
          )
          .into("accountdetails")
          .then(function (id) {
            return trx("accountinfo").insert({
              AccountNum: AccountNumber,
              AccountBalance: 0.0,
              UserId: id,
            });
          });
      })
      .then(() => {
        knex
          .select()
          .from("accountdetails", "accountinfo")
          .then((rows) => {
            for (row of rows) {
              console.log(
                `${row["FullName"]} ${row["Age"]} ${row["Address"]} ${row["Email"]} ${row["Password"]}`
              );
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(body);
          });
      })
      .catch(function (error) {
        console.error(error);
        res.writeHead(400, { "Content-Type": "application/json" });
      });
  });
};
module.exports = CreateAccount;
