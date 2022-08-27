import styles from './Badge.module.scss'

interface BadgeProps {
    text: string,
    type?: string,
}

export const Badge = ({ 
    text = 'Default badge text',
    type = 'primary'
}: BadgeProps) => {
    return (
        <span className={styles[type]}>{text}</span>
    )
}