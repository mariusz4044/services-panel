"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var connection_1 = require("./database/connection");
var routing_1 = require("./controllers/routing");
(0, connection_1.default)().then(function (res) {
    if (!res) {
        throw new Error("Error to connect to the database, please check the logs.");
    }
    (0, routing_1.startServer)();
});
