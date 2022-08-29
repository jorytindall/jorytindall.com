import styles from './Body.module.scss'

interface ParagraphProps {
    children: React.ReactNode,
    type?: 'primary' | 'secondary' | 'lead',
    collapse?: boolean,
}

interface CodeProps {
    children: React.ReactNode,
}

export const Paragraph = ({ 
    children,
    type='primary',
    collapse,
}: ParagraphProps) => {

    const getClasses = [
        styles[type],
        [collapse ? styles.collapse : null]
    ].join(' ')

    return <p className={getClasses}>{children}</p>
}

export const Code = ({ children }: CodeProps) => {
    return (
        <code className={styles.code}>{children}</code>
    )
}