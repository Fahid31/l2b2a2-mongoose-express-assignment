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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("../user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select("-password");
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const userExists = yield user.isUserExists(userId);
    if (!userExists) {
        throw new Error("User not found");
    }
    const result = yield user_model_1.User.findOne({ userId }).select("-password");
    return result;
});
const updateASingleUserFromDB = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const userExists = yield user.isUserExists(userId);
    if (!userExists) {
        throw new Error("User not found");
    }
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, updatedData, {
        new: true,
    });
    return result;
});
const deleteAUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const userExists = yield user.isUserExists(userId);
    if (!userExists) {
        throw new Error("User not found");
    }
    const result = yield user_model_1.User.updateOne({ userId }, { isDeleted: true });
    return result;
});
const addProductToOrderDB = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const userExists = yield user.isUserExists(userId);
    if (!userExists) {
        throw new Error("User not found");
    }
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, { $push: { orders: orderData } }, { new: true });
    //   console.log(result);
    return result;
});
const FetchOrdersForASpecificUserDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const userExists = yield user.isUserExists(userId);
    if (!userExists) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.findOne({ userId }).select('orders');
    return result;
});
const FetchTheOverallPriceOfUsersOrderDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const userExists = yield user.isUserExists(userId);
    if (!userExists) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.User.findOne({ userId }, { 'orders.price': 1, _id: 0 });
    if (!result || !result.orders || result.orders.length === 0) {
        return 0;
    }
    const totalPrice = result.orders.reduce((sum, order) => sum + order.price, 0);
    return totalPrice;
});
exports.userServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateASingleUserFromDB,
    deleteAUserFromDB,
    addProductToOrderDB,
    FetchOrdersForASpecificUserDB,
    FetchTheOverallPriceOfUsersOrderDB
};
