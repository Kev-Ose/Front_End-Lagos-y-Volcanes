import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import SERVER_URL from '../server';

export const AuthContext = createContext();

 

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

   

    const login = async (inputs) => {
        const res = await axios.post(
            SERVER_URL + 'api/auth/login',
            inputs,
            { withCredentials: true }
        );
        setCurrentUser(res.data);
    };

    const logout = () => {
        axios.post(
            SERVER_URL + 'api/auth/logout',
            {},
            { withCredentials: true }
        ); 

        setCurrentUser(null);
       
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;