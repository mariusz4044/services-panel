"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var connection_js_1 = require("./database/connection.js");
var routing_js_1 = require("./controllers/routing.js");
(0, connection_js_1.default)().then(function (res) {
    if (!res) {
        throw new Error("Error to connect to the database, please check the logs.");
    }
    (0, routing_js_1.startServer)();
});
