import { createContext, useEffect, useContext, useState } from "react";
import API from "../api/axios";

// Create the context
export const AuthContext = createContext();

// Export provider as a named export
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Auto-login if token exists
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await API.get("/user/profile");
				setUser(res.data);
			} catch {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		const token = localStorage.getItem("token");
		if (token) fetchUser();
		else {
			setLoading(false);
			setUser(null);
		}
	}, []);

	const login = async (formData) => {
		try {
			const res = await API.post("/auth/login", formData);
			localStorage.setItem("token", res.data.token);
			setUser(res.data.user);
			return { success: true };
		} catch (err) {
			return {
				success: false,
				message: err.response?.data?.message || "Login failed",
			};
		}
	};

	const register = async (formData) => {
		try {
			const res = await API.post("/auth/register", formData);
			localStorage.setItem("token", res.data.token);
			setUser(res.data.user);
			return { success: true };
		} catch (err) {
			return {
				success: false,
				message: err.response?.data?.message || "Registration failed",
			};
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Named hook export
export const useAuth = () => useContext(AuthContext);
