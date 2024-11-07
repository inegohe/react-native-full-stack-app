import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
        .then((response) => {
            if (response) {
                setIsLoggedIn(true);
                setUser(response);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setIsLoggedIn(false);

        })
    }, []);

    return (
        <GlobalContext.Provider
        value={{
            isLoggedIn, setIsLoggedIn,
            user, setUser,
            isLoading, setIsLoading
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}