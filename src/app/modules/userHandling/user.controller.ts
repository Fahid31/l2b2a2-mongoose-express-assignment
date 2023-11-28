import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const result = await userServices.createUserIntoDB(userData);

        res.status(200).json({
            success: true,
            message: 'User is created successfully',
            data: result,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUserFromDB()
        res.status(200).json({
            success: true,
            message: 'Get all the users successfully',
            data: result,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.userId 
        const result = await userServices.getSingleUserFromDB(parseInt(id))
        res.status(200).json({
            success: true,
            message: 'Single user fetched successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
}

export const userController ={
    createUser,
    getAllUser,
    getSingleUser
}