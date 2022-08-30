import styles from './Button.module.scss'
import { getClasses } from 'utils/getClasses'

interface ButtonProps {
    children: React.ReactNode,
    isLink?: boolean,
    variant?: 'primary' | 'secondary' | 'tertiary',
    size?: 'small' | 'default' | 'large',
}

export const Button = ({
    children = 'Button text',
    isLink = false,
    variant = 'primary',
    size = 'default'
}: ButtonProps) => {

    const classes = getClasses([
        styles[variant],
        styles[size]
    ])

    return (
        <button className={classes}>{children}</button>
    )
}