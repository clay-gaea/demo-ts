"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserClient = require("com.clay.uac-simple-api/client/UserClient");
UserClient.findUser(1).then(rt => {
    console.log("clay1", rt);
});
UserClient.queryUserPage().then(rt => {
    console.log("clay2", rt);
});
