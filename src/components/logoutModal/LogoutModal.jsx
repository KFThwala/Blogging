import React from "react";
import "./LogoutModal.css";

const LogoutModal = ({ isOpen, onCancel, onConfirm }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Are you sure you want to log out?</h2>
				<div className="modal-buttons">
					<button className="cancel-button" onClick={onCancel}>
						Cancel
					</button>
					<button className="confirm-button" onClick={onConfirm}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
};

export default LogoutModal;
