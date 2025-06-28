import React from "react";
import { Link } from "react-router-dom";
import { FiTwitter, FiFacebook, FiInstagram, FiMail } from "react-icons/fi";
import "./Footer.css";

function Footer() {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-brand">
					<h2>MyBlog</h2>
					<p>Write. Share. Inspire.</p>
				</div>

				<div className="footer-links">
					<Link to="/about">About</Link>
					<Link to="/contact">Contact</Link>
					<Link to="/privacy">Privacy</Link>
					<Link to="/terms">Terms</Link>
				</div>

				<div className="footer-socials">
					<a href="#" title="Twitter">
						<FiTwitter />
					</a>
					<a href="#" title="Facebook">
						<FiFacebook />
					</a>
					<a href="#" title="Instagram">
						<FiInstagram />
					</a>
					<a href="mailto:info@myblog.com" title="Email">
						<FiMail />
					</a>
				</div>
			</div>

			<p className="footer-copy">
				&copy; {new Date().getFullYear()} MyBlog. All rights reserved.
			</p>
		</footer>
	);
}

export default Footer;
