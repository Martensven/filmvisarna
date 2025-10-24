import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Called on app load → checks active session
    const fetchMe = async () => {
        try {
            const res = await fetch("/api/me", {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        }
        setLoading(false);
    };



    // Login function
    const login = async (email: string, password: string) => {
        const res = await fetch("/api/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) return false;

        await fetchMe(); // update user from session
        return true;
    };

    // Logout function clears session cookie on server
    const logout = async () => {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};