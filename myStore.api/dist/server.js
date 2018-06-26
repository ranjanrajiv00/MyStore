"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const index_1 = require("./core/index");
const port = 3256;
process.on("uncaughtException", function handleError(error) {
    index_1.Logger.logger.log(`${error} uncaughtException`);
});
app_1.default.listen(port, (err) => {
    if (err)
        return console.log(`Unable to start server - ${err}`);
    else
        return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map