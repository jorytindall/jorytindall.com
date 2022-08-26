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
        <p className={[
            styles.paragraph,
            styles[`paragraph--${type}`],
        ].join(' ')}>{children}</p>
    )
}

export const Code = ({ children }: CodeProps) => <code className={styles.code}>{children}</code>