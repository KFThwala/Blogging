import React from "react";
import "./About.css";

function About() {
	return (
		<div className="about-page">
			<section className="about-hero">
				<h1>About Our Platform</h1>
				<p>
					We are a community-driven platform that empowers users to share ideas,
					stories, and knowledge through beautifully written blog posts. Whether
					you're a reader or a writer, you're welcome here.
				</p>
			</section>

			<section className="about-section">
				<h2>Our Mission</h2>
				<p>
					Our mission is to amplify voices and create a space where meaningful
					content can be discovered and appreciated. We believe in creativity,
					authenticity, and community.
				</p>
			</section>

			<section className="about-section">
				<h2>Meet the Team</h2>
				<div className="team-grid">
					<div className="team-card">
						<img src="https://via.placeholder.com/120" alt="Team Member" />
						<h4>Jane Doe</h4>
						<p>Founder & CEO</p>
					</div>
					<div className="team-card">
						<img src="https://via.placeholder.com/120" alt="Team Member" />
						<h4>John Smith</h4>
						<p>Lead Developer</p>
					</div>
					{/* Add more team members as needed */}
				</div>
			</section>
		</div>
	);
}

export default About;
