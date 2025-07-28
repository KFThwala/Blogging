import React from "react";
import Header from "../../components/common/header/Header";
import "./Landing.css";
import Button from "../../components/common/button/Button";
import FeaturesSection from "../../components/Landing/feature_section/FeatureSection";
import SamplePostsSection from "../../components/Landing/samplePost/SamplePostSection";
import Footer from "../../components/common/footer/Footer";
import { Link } from "react-router-dom";
import RecentPosts from "../../components/home/RecentPosts/RecentPosts";

function Landing() {
	return (
		<div>
			<Header />
			<section className="container_hero">
				<div className="content">
					<div className="left_content">
						<h1>Write. Share. Inspire</h1>
						<p>
							Your go-to destination for sharing stories, ideas, and insights.
							Whether you're a passionate writer or just getting started,
							BlogSphere gives you the tools to express yourself, connect with
							readers, and grow your voice online.
						</p>
						<Link to="/register" className="get_started_button">
							Get Started
						</Link>
					</div>
					<div className="right_content">
						<img
							className="landing_image"
							src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
							alt="Landing"
						/>
					</div>
				</div>
				<div className="scroll-mouse-container">
					<div className="mouse">
						<div className="scroll-wheel" />
					</div>
					<p className="scroll-text">Scroll</p>
				</div>
			</section>
			<FeaturesSection />
			<RecentPosts />
			<Footer />
		</div>
	);
}

export default Landing;
