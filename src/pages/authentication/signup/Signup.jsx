import React, { useState } from "react";
import "./Signup.css"; // Assuming your styles are in Signup.css
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const handleChange = async (e) => {
		console.log(e.target.value);
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validate = () => {
		let valid = true;
		let newErrors = { fullName: "", email: "", password: "" };

		if (!formData.fullName.trim()) {
			newErrors.fullName = "Full Name is required";
			valid = false;
		}

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validate()) return;

		try {
			const result = await register(formData);

			if (result.success) {
				toast.success("Registration successful 🚀🚀🚀", { duration: 3000 });
				navigate("/login");
			} else {
				toast.error(result.message || "Registration failed!");
			}
		} catch (error) {
			toast.error("Registration failed!");
			console.error(error);
		}
	};
	return (
		<div className="container">
			<motion.div
				className="left-side"
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}>
				<h1>Welcome to MyBlog</h1>
				<p>Create your account to get started!</p>
			</motion.div>
			<div className="right-side">
				<form onSubmit={handleSubmit} className="signup-form">
					<h2>Sign Up</h2>
					<input
						type="text"
						name="fullName"
						onChange={handleChange}
						value={formData.fullName}
						placeholder="Full Name"
					/>
					{errors.fullName && <span className="error">{errors.fullName}</span>}
					<input
						type="email"
						name="email"
						onChange={handleChange}
						value={formData.email}
						placeholder="Email"
					/>
					{errors.email && <span className="error">{errors.email}</span>}
					<input
						type="password"
						name="password"
						onChange={handleChange}
						value={formData.password}
						placeholder="Password"
					/>
					{errors.password && <span className="error">{errors.password}</span>}
					<button type="submit">
						{loading ? "Registering..." : "Register"}
					</button>
					<p>
						Already have an account? <Link to="/login">Login</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Signup;
