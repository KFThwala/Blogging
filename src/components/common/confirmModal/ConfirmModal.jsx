import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({
	isOpen,
	onCancel,
	onConfirm,
	title = "Are you sure?",
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
}) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>{title}</h2>
				<div className="modal-buttons">
					<button className="cancel-button" onClick={onCancel}>
						{cancelLabel}
					</button>
					<button className="confirm-button" onClick={onConfirm}>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
