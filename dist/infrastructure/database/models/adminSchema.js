"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "salon"],
        default: "admin",
    },
    userList: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    //   salonList:{ type: Schema.Types.ObjectId, ref: "Theater" }]
}, {
    timestamps: true,
});
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
