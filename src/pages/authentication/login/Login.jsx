import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const validate = () => {
		let valid = true;
		let newErrors = { email: "", password: "" };

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
			valid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Enter a valid email address";
			valid = false;
		}

		if (!formData.password.trim()) {
			newErrors.password = "Password is required";
			valid = false;
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // ⬅️ Show loading
		if (!validate()) return;
		try {
			const response = await login(formData);
			if (response.success) {
				navigate("/home");
			} else {
				toast.error(response.message || "Login failed!");
			}
		} catch (error) {
			toast.error("Registration failed!");
			console.error(error);
		} finally {
			setLoading(false); // ⬅️ Hide loading regardless of success/failure
		}
	};
	return (
		<div className="login_container">
			<motion.div
				className="form_container"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				<form onSubmit={handleSubmit} className="login_form">
					<h2>Login</h2>
					<input
						type="email"
						name="email"
						onChange={handleInputChange}
						value={formData.email}
						placeholder="Email"
					/>
					{errors.email && <span className="error">{errors.email}</span>}
					<input
						type="password"
						name="password"
						onChange={handleInputChange}
						value={formData.password}
						placeholder="Password"
					/>
					{errors.password && <span className="error">{errors.password}</span>}
					<button type="submit">{loading ? "Logging in..." : "Login"} </button>
					<p>
						Don't have an account?{" "}
						<Link to="/register" className="link">
							Signup
						</Link>
					</p>
				</form>
			</motion.div>
		</div>
	);
}

export default Login;
