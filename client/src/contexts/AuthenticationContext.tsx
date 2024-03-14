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
        setIsAuthenticated(!!localStorage.getItem("cm-jwt-token"));
    }, []);

    const checkWindow = () => {
        if (typeof window !== 'undefined' && !isAuthenticated) {
            return window.location.href = '/login';
        }
    
        if (typeof window == 'undefined') {
            return <p> Carregando </p>
        }
    }

    useEffect(() => {
        checkWindow();
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