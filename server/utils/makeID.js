"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (length) => {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
//# sourceMappingURL=makeID.js.map