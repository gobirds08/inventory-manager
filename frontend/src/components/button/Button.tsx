import styles from "./Button.module.css"

interface ButtonProps{
    content: string,
}

function Button({content}: ButtonProps){
    return <button className={`${styles.button}`}>{content}</button>
}

export default Button;