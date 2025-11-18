import { createContext, useContext, useState, } from "react";
import { useNavigate } from "react-router-dom"
import axios, { HttpStatusCode } from "axios"
import { asyncHandler } from "../utils/asyncHandler.js";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8080/api/v1/users"
})

export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext)

    const [userData, setUserData] = useState(authContext)

    const router = useNavigate()

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name,
                username,
                password
            })
            if (request.status === HttpStatusCode.Created ) {
                return request.data.message;
            }
        } catch (err) {
            throw err
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username,
                password
            })

            if (request.status === HttpStatusCode.Ok) {
                localStorage.setItem("refreshToken", request.data.refreshToken)
            }
        } catch (err) {
            throw err;
        } 
    }


    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}


