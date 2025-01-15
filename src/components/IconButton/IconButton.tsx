//import styles from './Button.module.css'
import styles from './IconButton.module.css';

type IconButtonProps = {
    src: string; // Иконка, передаваемая в виде компонента (например, <svg> или <img>)
    label: string; // Текст кнопки
    alt: string;
    onClick: () => void; // Обработчик клика
    className?: string; // Дополнительный класс для стилей
    disabled?: boolean; // Состояние "заблокирована"
    title: string;
};

const IconButton: React.FC<IconButtonProps> = ({ src, label, alt, onClick, className = '', disabled = false, title }) => {
    return (
        <button
            className={`${styles.iconButton} ${className}`}
            onClick={onClick}
            disabled={disabled}
            title={title}
        >
            <img className={styles.icon} src={src} alt={alt}/>
            <span className={styles.label}>{label}</span>
        </button>
    );
};

export default IconButton;

// type ButtonProps = {
//     src: string,
//     onClick: () => void,
//     className: string,
// }

// function Button({src, onClick, className}: ButtonProps) {
//     return (
//         <button className={`${styles.button} ${className}`} onClick={onClick}>
//             <image src={src}/>
//         </button>
//     )
// }

// export {
//     Button,
// }

