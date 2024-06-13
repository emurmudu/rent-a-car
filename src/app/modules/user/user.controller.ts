import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userZodSchema from "./user.validation";



const addUser = async (req:Request, res: Response) =>{
    
    try {
        const user = req.body;

        const zodParsedData = userZodSchema.parse(user)

    const result = await UserServices.createUserIntoDB(zodParsedData)

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: result,
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error
        })
    }

}





export const UserControllers ={
    addUser,
 

}
