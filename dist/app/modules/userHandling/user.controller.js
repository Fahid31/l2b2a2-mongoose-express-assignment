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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodParsedData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.userServices.createUserIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "User is created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Values must be unique, duplicates are not allowed.",
            error: error,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: "Get all the users successfully",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_service_1.userServices.getSingleUserFromDB(parseInt(id));
        res.status(200).json({
            success: true,
            message: "Single user fetched successfully",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: {
                code: error.code || 500,
                description: error.description || "User not found!",
            },
        });
    }
});
const updateASingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const result = yield user_service_1.userServices.updateASingleUserFromDB(parseInt(userId), updatedData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Some issue occurs!",
            error: {
                code: error.code || 500,
                description: error.description || 'User not found!',
            },
        });
    }
    ;
});
const deleteAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userServices.deleteAUserFromDB(parseInt(userId));
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: result.upsertedId
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: error.code || 500,
                description: error.description || 'User not found!',
            },
        });
    }
    ;
});
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orderData = req.body;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const result = yield user_service_1.userServices.addProductToOrderDB(parseInt(userId), orderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: null
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: error.code || 500,
                description: error.description || 'User not found',
            },
        });
    }
});
const FetchOrdersForASpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userServices.FetchOrdersForASpecificUserDB(parseInt(userId));
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: error.code || 500,
                description: error.description || 'User not found!',
            },
        });
    }
});
const FetchTheOverallPriceOfUsersOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userServices.FetchTheOverallPriceOfUsersOrderDB(parseInt(userId));
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: {
                "total-price": result
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: error.code || 500,
                description: error.description || 'User not found!',
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateASingleUser,
    deleteAUser,
    addProductToOrder,
    FetchOrdersForASpecificUser,
    FetchTheOverallPriceOfUsersOrder
};
