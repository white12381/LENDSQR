const bcrypt = require("bcrypt");
const knex = require("../Controller/knex");
const TransferAccount = (res, req) => {
  var body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", function () {
    var datas = JSON.parse(body);
    const { Amount } = datas;
    const { Password } = datas;
    const { OwnAccountNumber } = datas;
    const { DestinationAccountNumber } = datas;

    var IsAccountNumber, isTransferAccountNumber;
    //check if password is correct
    let passwordCorrect = false;
    knex
      .from("accountinfo")
      .select("*")
      .then(async (rows) => {
        for (let i = 0; i < rows.length; i++) {
          const validPassword = await bcrypt.compare(
            Password,
            "" + rows[i].Password
          );
          console.log(validPassword);
          if (DestinationAccountNumber === rows[i].AccountNum) {
            IsAccountNumber = true;
          }
          if (OwnAccountNumber === rows[i].AccountNum) {
            isTransferAccountNumber = true;
          }
        }

        if (passwordCorrect === true) {
          console.log("Correct Password");
        } else {
          console.log("Incorrect Password");
        }
        passwordCorrect = true;

        //fund userr Account
        if (passwordCorrect && IsAccountNumber && isTransferAccountNumber) {
          knex("accountinfo")
            .where("AccountNum", "=", OwnAccountNumber)
            .where("AccountBalance", ">", Amount)
            .decrement("AccountBalance", Amount)
            .then((data) => {
              if (data == 1) {
                knex("accountinfo")
                  .where("AccountNum", "=", DestinationAccountNumber)
                  .increment("AccountBalance", Amount)
                  .then((res) => {
                    if (res == 1) {
                      console.log("Transfer Done");
                      res.writeHead(200, {
                        "Content-Type": "Application/Json",
                      });
                    }
                  });
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
          console.log("Transfer Done");

          res.end("Done");
        }
      });
  });
};
module.exports = TransferAccount;
