import React from "react"; // Add some styles for centering and backdrop
import styles from "./PopUp.module.css";

interface PopUpProps {
	show: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

function PopUp({ show, onClose, children }: PopUpProps) {
	if (!show) return null;

	return (
		<div className={`${styles.popUpBackground}`} onClick={onClose}>
			<div className={styles.popUpContent} onClick={(e) => e.stopPropagation()}>
				<button className={styles.popUpClose} onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
}

export default PopUp;
