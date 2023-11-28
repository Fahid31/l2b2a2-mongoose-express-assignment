"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Product Quantity is required"],
    },
});
const TUserFullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
});
const TUserAddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    fullName: {
        type: TUserFullNameSchema,
        required: [true, "Full Name is required"],
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "{VALUE} is not valid",
        },
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    address: {
        type: TUserAddressSchema,
        required: [true, "Address is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    orders: {
        type: [orderSchema],
    }
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
//query middleware
userSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// query middleware
userSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// aggregate middleware
userSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
userSchema.methods.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return !!existingUser;
    });
};
exports.User = (0, mongoose_1.model)("user", userSchema);
