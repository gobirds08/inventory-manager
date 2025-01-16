import styles from "./Button.module.css"

interface ButtonProps{
    content: string,
    classes?: string,
}

function Button({content, classes}: ButtonProps){
    return <button className={`${styles.button} ${classes}`}>{content}</button>
}

export default Button;