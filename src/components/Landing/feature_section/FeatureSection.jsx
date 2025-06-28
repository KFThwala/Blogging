import React from "react";
import { FiEdit3, FiUsers, FiSmartphone, FiEye } from "react-icons/fi";
import "./FeatureSection.css";

const features = [
	{
		icon: <FiEdit3 className="feature-icon" />,
		title: "Easy Editing",
		desc: "Write and publish articles effortlessly with our rich editor.",
	},
	{
		icon: <FiUsers className="feature-icon" />,
		title: "Community",
		desc: "Engage with readers and other authors through comments and follows.",
	},
	{
		icon: <FiSmartphone className="feature-icon" />,
		title: "Mobile Friendly",
		desc: "Read and write on the go with full mobile support.",
	},
	{
		icon: <FiEye className="feature-icon" />,
		title: "Discoverability",
		desc: "Get noticed by search engines and featured in trending lists.",
	},
];

function FeaturesSection() {
	return (
		<section className="features-section">
			<h2 className="features-title">Why Choose MyBlog?</h2>
			<div className="features-grid">
				{features.map((item, index) => (
					<div className="feature-card" key={index}>
						{item.icon}
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
					</div>
				))}
			</div>
		</section>
	);
}

export default FeaturesSection;
