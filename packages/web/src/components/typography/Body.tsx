import styles from './Body.module.scss'

interface ParagraphProps {
    children: React.ReactNode,
    type?: 'primary' | 'secondary' | 'lead',
}

interface CodeProps {
    children: React.ReactNode,
}

export const Paragraph = ({ 
    children,
    type='primary'
}: ParagraphProps) => {
    return (
        <p className={styles[type]}>{children}</p>
    )
}

export const Code = ({ children }: CodeProps) => {
    return (
        <code className={styles.code}>{children}</code>
    )
}