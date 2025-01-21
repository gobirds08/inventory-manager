import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
	children?: React.ReactNode;
	classes?: string;
	action?: () => any;
}

function Button({ children, classes, action }: ButtonProps) {
	return (
		<button className={`${styles.button} ${classes}`} onClick={action}>
			{children}
		</button>
	);
}

export default Button;
