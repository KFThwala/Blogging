import { createContext, useEffect, useContext, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Auto-login if token exists
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await API.get("/user/profile");
				console.log(res);
				setUser(res.data);
			} catch (err) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		const token = localStorage.getItem("token");
		if (token) {
			fetchUser();
		} else {
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
			console.log("res", res);
			localStorage.setItem("token", res.data.token);
			// console.log(res.data.user);

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
		<AuthContext.Provider
			value={{
				user,
				loading,
				login,
				register,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
