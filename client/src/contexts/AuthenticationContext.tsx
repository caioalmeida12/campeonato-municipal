"use client"

import { createContext, useCallback, useEffect, useState } from "react";

interface AuthenticationContextProps {
    isAuthenticated: boolean;
    checkAuthentication: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextProps>({
    isAuthenticated: false,
    checkAuthentication: () => {}
});

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const checkAuthentication = useCallback(() => {
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
            setIsAuthenticated(!!localStorage.getItem("cm-jwt-token"));

            if (!localStorage.getItem("cm-jwt-token")) {
                window.location.href = "/login";
            }
        }
    }, []);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    
    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, checkAuthentication }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationContext;
export { AuthenticationProvider };