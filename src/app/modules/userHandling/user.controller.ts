import { Request, Response } from "express";
import { userServices } from "./user.service";
import UserValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsedData = UserValidationSchema.parse(userData);

    const result = await userServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: "User is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Values must be unique, duplicates are not allowed.",
      error: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "Get all the users successfully",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.getSingleUserFromDB(parseInt(id));
    res.status(200).json({
      success: true,
      message: "Single user fetched successfully",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: {
        code: error.code || 500,
        description: error.description || "User not found!",
      },
    });
  }
};

const updateASingleUser = async (req: Request, res: Response) => {

    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const result = await userServices.updateASingleUserFromDB(parseInt(userId), updatedData)
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message || "Some issue occurs!",
            error:  {
                code: error.code || 500,
                description: error.description || 'User not found!',
            },
        });
    };
};

const deleteAUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const result = await userServices.deleteAUserFromDB(parseInt(userId))
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: result.upsertedId
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: error.code || 500,
                description: error.description || 'User not found!',
            },
        });
    };
};

const addProductToOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const orderData = req.body
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const result = await userServices.addProductToOrderDB(parseInt(userId), orderData)
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: null
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: error.code || 500,
                description: error.description || 'User not found',
            },
        });
    }
}

const FetchOrdersForASpecificUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const result = await userServices.FetchOrdersForASpecificUserDB(parseInt(userId))
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: error.code || 500,
                description: error.description || 'User not found!',
            },
        });
    }
}
const FetchTheOverallPriceOfUsersOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const result = await userServices.FetchTheOverallPriceOfUsersOrderDB(parseInt(userId))
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: {
                "total-price":result
            }
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: error.code || 500,
                description: error.description || 'User not found!',
            },
        });
    }
}

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateASingleUser,
  deleteAUser,
  addProductToOrder,
  FetchOrdersForASpecificUser,
  FetchTheOverallPriceOfUsersOrder
};
