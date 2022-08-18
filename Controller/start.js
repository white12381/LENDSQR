const server = require("./index.js");
var port = 4000 || process.env.Port
server.listen(port);
console.log("port running on 4000");
