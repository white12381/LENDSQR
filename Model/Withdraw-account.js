const bcrypt = require("bcrypt");
const knex = require("../Controller/knex");
const WithdrawAccount = (res, req) => {
  var body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", function () {
    res.writeHead(200, { "Content-Type": "Application/Json" });
    var datas = JSON.parse(body);
    const { Amount } = datas;
    const { Password } = datas;
    const { AccountNumber } = datas;

    var IsAccountNumber;
    //check if password is correct
    let passwordCorrect = false;
    knex
      .from("accountinfo")
      .select("*")
      .then((rows) => {
        for (let i = 0; i < rows.length; i++) {
          if (AccountNumber === rows[i].AccountNum) {
            IsAccountNumber = true;
          }

          passwordCorrect = true;
          // if(passwordCorrect === true){console.log("Correct Password"); break;}
          // else{console.log("Incorrect Password")}
        }

        //fund userr Account
        if (passwordCorrect && IsAccountNumber) {
          knex("accountinfo")
            .where("AccountNum", "=", AccountNumber)
            .where("AccountBalance", ">", Amount)
            .decrement("AccountBalance", Amount)
            .then((data) => {
              if (data == 1) {
                console.log("Successfully Withdraw");
              } else {
                console.log("Balance is too low");
              }
            })
            .catch((err) => {
              console.log(err);
              throw err;
            })
            .finally(() => {
              knex.destroy();
            });
          console.log("Withdraw");

          res.end("Done");
        }
      });
  });
};
module.exports = WithdrawAccount;
