import React from "react";
import "./Contact.css";

function Contact() {
	return (
		<div className="contact-page">
			<section className="contact-hero">
				<h1>Contact</h1>
				<p>
					We'd love to hear from you. Reach out to us directly using the
					information below.
				</p>
			</section>

			<div className="contact-info-container">
				<div className="contact-info">
					<h2>Get in Touch</h2>

					<div className="contact-method">
						<h3>Email</h3>
						<a href="mailto:kagithwala@gmail.com">kagithwala@gmail.com</a>
					</div>

					<div className="contact-method">
						<h3>Phone</h3>
						<a href="tel:+27661973152">066 197 3152</a>
					</div>

					<div className="location">
						<h3>Location</h3>
						<div className="country">
							<img
								src="https://flagcdn.com/w80/za.png"
								alt="South African Flag"
								width="30"
							/>
							<span>South Africa</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contact;
