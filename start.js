const server = require("./Controller/index");
const port = 3000 || process.env.Port
server.listen(port);
console.log(`port running on ${port}`);
