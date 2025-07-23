import React, { useState } from "react";
import "./Contact.css";

function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Optional: send data to backend or email service
		console.log("Submitted form:", formData);
		setSubmitted(true);
		setFormData({ name: "", email: "", message: "" });
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
					<p>Email: support@example.com</p>
					<p>Phone: +123 456 7890</p>
					<p>Address: 123 Main Street, Cape Town, South Africa</p>
				</div>

				<div className="contact-form-container">
					<h2>Send a Message</h2>
					{submitted && (
						<p className="thank-you">Thank you! We'll be in touch soon.</p>
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
						<button type="submit">Send Message</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Contact;
