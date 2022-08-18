const http = require("http");
const CreateAccount = require("../Model/create-account");
const FundAccount = require("../Model/fund-account");
const TransferAccount = require("../Model/transfer-account");
const WithdrawAccount = require("../Model/Withdraw-account");
const bcrypt = require("bcrypt");
const knex = require("./knex");

const ComparePassword = (name, hash) => bcrypt.compareSync(name, hash);

const server = http.createServer((req, res) => {

  if(req.url === '/'){
    res.end("LENDSQR");
  }
  // Register
  if (req.url === "/create-account" && req.method == "POST") {
    CreateAccount(res, req);
  }

  // Fund User Account
  if (req.url === "/fund-account" && req.method === "POST") {
    FundAccount(res, req);
  }

  //Transfer Funds to Another User Account
  if (req.url === "/transfer-account" && req.method === "POST") {
    TransferAccount(res, req);
  }

  // Withdraw Funds
  if (req.url === "/Withdraw-account" && req.method === "POST") {
    WithdrawAccount(res, req);
  }
});

// server.listen(4000);
// console.log("port running on 4000");
module.exports = server;
