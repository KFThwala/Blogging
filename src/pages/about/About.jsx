import React from "react";
import "./About.css";
import devImage from "../../assets/kagiso.jpg";

function About() {
	return (
		<div className="about-page">
			<section className="about-hero">
				<span className="about-badge">ABOUT US</span>

				<h1>
					A Place Where <span>Ideas</span> Become Stories
				</h1>

				<p>
					Our blogging platform was built to give creators a beautiful place to
					share knowledge, experiences, and inspiration. Whether you're writing
					your first article or discovering your next favorite read, you're part
					of our growing community.
				</p>
			</section>

			<section className="about-content">
				<div className="about-card">
					<h2>Our Mission</h2>

					<p>
						We believe everyone has a story worth sharing. Our goal is to make
						publishing simple, reading enjoyable, and connecting with
						like-minded people effortless.
					</p>
				</div>

				<div className="about-card">
					<h2>What We Offer</h2>

					<ul>
						<li>Write and publish blog posts.</li>
						<li>Explore articles across multiple categories.</li>
						<li>Like, comment, and engage with writers.</li>
						<li>Discover trending and featured content.</li>
					</ul>
				</div>
			</section>

			<section className="developer-section">
				<div className="developer-card">
					<img src={devImage} alt="Kagiso Thwala" />

					<div className="developer-info">
						<span className="developer-role">Lead Developer</span>

						<h2>Kagiso Thwala</h2>

						<p>
							Hi! I'm Kagiso, a full-stack developer passionate about building
							modern web applications that are fast, clean, and user-friendly.
							This platform was designed from the ground up using the MERN stack
							with the goal of creating a great blogging experience.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}

export default About;
