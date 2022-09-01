import styles from './Input.module.scss'
import { getClasses } from 'utils/getClasses'

interface InputProps {
    placeholder?: string,
    type: 'text' | 'email' | 'tel' | 'hidden' | 'number' | 'password' | 'url',
    name: string,
}

export const Input = ({ placeholder, type, name }: InputProps) => {

    const classes = getClasses([
        styles.input
    ])

    return (
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            className={classes}
        />
    )
}

