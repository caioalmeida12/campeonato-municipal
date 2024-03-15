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
        if (typeof window !== "undefined" && typeof localStorage !== "undefined" && window.location.pathname !== "/login") {
            const token = localStorage.getItem("cm-jwt-token");
            setIsAuthenticated(!!token);

            if (!token) {
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