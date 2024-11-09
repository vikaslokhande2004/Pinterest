import React, { createContext, useState, useEffect } from 'react'
import { assets } from "../assets/assets";
import axios from 'axios';

export const AppContext = createContext()

const AppContextProvider = (props) => {

        const backendUrl = import.meta.env.VITE_BACKEND_URL

        // const [token,setToken] = useState(localStorage.getItem('accessToken')?localStorage.getItem('accessToken'):false)
        const [token, setToken] = useState(null);
        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const response = await axios.post(backendUrl + `/user/refresh-token`, {}, { withCredentials: true });
                    if (response.data.success) {
                        setToken(true);
                        // console.log("User is authenticated")
                    } else {
                        setToken(false)
                        // console.log(" User is not authenticated")
                    }
                } catch (error) {
                    console.error("Error checking authentication:", error);
                    setToken(false); // Set to false if there's an error
                }
            };
    
            checkAuth();
        }, [backendUrl]);


    const value = {
        assets,
        backendUrl,
        token,setToken
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
