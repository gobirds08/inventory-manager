import React from "react";
import styles from "./Button.module.css"

interface ButtonProps{
    children?: React.ReactNode;
    classes?: string;
    action?: () => any;
}

function Button({children, classes}: ButtonProps){
    return <button className={`${styles.button} ${classes}`}>{children}</button>
}

export default Button;