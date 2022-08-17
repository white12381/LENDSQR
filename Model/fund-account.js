const knex = require("../Controller/knex");
const FundAccount = (res, req) => {
  var body = "";
  var data;

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", function () {
    // res.writeHead(200, {'Content-Type': 'Application/Json'});
    var datas = JSON.parse(body);
    const { CardNumber } = datas;
    const { CV } = datas;
    const { Amount } = datas;
    const { UserName } = datas;
    const { AccountNumber } = datas;

    //fund userr Account
    if (CardNumber.toString().length === 16 && CV.toString().length === 3) {
      knex("accountinfo")
        .where(`AccountNum`, "=", AccountNumber)
        .increment("AccountBalance", Amount)
        .then((data) => {
          if (data == 1) {
            console.log("Balance Updated");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(body);
          } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            console.log("Invalid Account Number");
          }
        })
        .catch((err) => {
          console.log(err);
          throw err;
        })
        .finally(() => {
          knex.destroy();
        });
    }
  });
};
module.exports = FundAccount;
