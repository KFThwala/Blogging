import React from "react";
import {
	FiBookOpen,
	FiUsers,
	FiTrendingUp,
	FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./AboutSection.css";

function AboutSection() {
	return (
		<section className="about-section">
			<div className="about-container">
				<div className="about-content">
					<span className="about-badge">ABOUT OUR PLATFORM</span>

					<h2 className="about-title">
						Where Stories Inspire,
						<span> Knowledge Grows.</span>
					</h2>

					<p className="about-description">
						Our platform connects passionate writers with curious readers.
						Whether you're sharing your expertise, documenting your journey, or
						discovering new ideas, we provide a beautiful space where content
						comes to life.
					</p>

					<div className="about-features">
						<div className="about-feature">
							<div className="feature-icon">
								<FiBookOpen />
							</div>

							<div>
								<h4>Quality Articles</h4>
								<p>
									Discover carefully crafted stories and insightful content.
								</p>
							</div>
						</div>

						<div className="about-feature">
							<div className="feature-icon">
								<FiUsers />
							</div>

							<div>
								<h4>Growing Community</h4>
								<p>Connect with writers and readers from around the world.</p>
							</div>
						</div>

						<div className="about-feature">
							<div className="feature-icon">
								<FiTrendingUp />
							</div>

							<div>
								<h4>Learn Every Day</h4>
								<p>
									Explore topics that help you grow personally and
									professionally.
								</p>
							</div>
						</div>
					</div>

					<Link to="/blog" className="about-btn">
						Explore Articles
						<FiArrowRight />
					</Link>
				</div>

				<div className="about-image">
					<img
						src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
						alt="People reading articles"
					/>
				</div>
			</div>
		</section>
	);
}

export default AboutSection;
