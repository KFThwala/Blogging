import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [modal, setModal] = useState({ isOpen: false, message: "", type: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);

		emailjs
			.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				{
					from_name: formData.name,
					to_name: "Kagiso Thwala",
					from_email: formData.email,
					to_email: "kagithwala@gmail.com",
					message: formData.message,
				},
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Or hardcoded like "ZY7IobEe3z40nGZtU"
			)
			.then(() => {
				setIsLoading(false);
				setSubmitted(true);
				setFormData({ name: "", email: "", message: "" });
				setModal({
					isOpen: true,
					message: "Message sent successfully! Will get back to you.",
					type: "success",
				});
			})
			.catch((error) => {
				setIsLoading(false);
				console.error("Error sending email: ", error);
				setModal({
					isOpen: true,
					message: "Message sending failed. Please try again later.",
					type: "error",
				});
			});
	};

	return (
		<div className="contact-page">
			<section className="contact-hero">
				<h1>Contact Us</h1>
				<p>
					We’d love to hear from you. Fill out the form or reach us directly.
				</p>
			</section>

			<div className="contact-grid">
				<div className="contact-info">
					<h2>Get in Touch</h2>
					<p>Email: kagithwala@gmail.com</p>
					<p>Phone: 0661973152</p>
					<img
						src="https://flagcdn.com/w80/za.png"
						alt="South African Flag"
						width="30"
					/>
				</div>

				<div className="contact-form-container">
					<h2>Send a Message</h2>

					{submitted && (
						<p className="thank-you">Thank you! we'll be in touch soon.</p>
					)}

					<form onSubmit={handleSubmit} className="contact-form">
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
						<input
							type="email"
							name="email"
							placeholder="Your Email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<textarea
							name="message"
							rows="5"
							placeholder="Your Message"
							value={formData.message}
							onChange={handleChange}
							required></textarea>

						<button type="submit" disabled={isLoading}>
							{isLoading ? "Sending..." : "Send Message"}
						</button>
					</form>

					{modal.isOpen && (
						<p className={`modal ${modal.type}`}>{modal.message}</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Contact;
