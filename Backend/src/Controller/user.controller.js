import { asyncHandler } from "../Utils/asyncHandler.js"
import { apiError } from "../Utils/apiError.js"
import httpStatus from "http-status"
import { User } from "../Model/user.Model.js";
import { apiResponse } from '../Utils/apiResponse.js'



const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new apiError(httpStatus.NOT_FOUND, "User not found ")
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
}

const register = asyncHandler(async (req, res) => {
    const { username, name, password } = req.body;

    if ([username, name, password].some((field) => field.trim() === "")) {
        throw new apiError(httpStatus.NO_CONTENT, "some fields are empty")
    }
    const registeredUser = await User.findOne({ username });

    if (registeredUser) {
        throw new apiError(httpStatus.FOUND, "User are allready exist PLEASE LOGIN ")
    }

    const newUser = await User.create(
        {
            name,
            username: username.toLowerCase(),
            password,
        }
    )
    const createUser = await User.findById(newUser._id).select("-password -refreshToken")

    if (!createUser) {
        throw new apiError(httpStatus.NOT_FOUND, "User are allready exist PLEASE LOGIN ")
    }

    return res
        .status(httpStatus.CREATED)
        .json(new apiResponse(httpStatus.CREATED, createUser, "user successfully created"))
})

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new apiError(httpStatus.NO_CONTENT, "please porvide details")
    }
    const user = await User.findOne({ username })

    if (!user) {
        throw new apiError(httpStatus.NO_CONTENT, "user not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    console.log(isPasswordValid)

    if (!isPasswordValid) {
        throw new apiError(401, "user password not found")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new apiResponse(200,
            {
                user: accessToken, refreshToken, loggedInUser
            },
            "User successfully logged in "
        ))

})

export {
    register,
    login,
}