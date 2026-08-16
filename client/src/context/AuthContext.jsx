import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api'; // we will use this to set the default token or parse

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If token exists, we could fetch /me to get fresh user details, 
        // but for now we rely on the decoded stored user from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (role, credentials) => {
        try {
            const response = await api.post(`/auth/${role}/login`, credentials);
            const { user, token } = response.data;

            setUser(user);
            setToken(token);

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
