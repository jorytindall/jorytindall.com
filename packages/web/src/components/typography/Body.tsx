import styles from './Body.module.scss'

interface ParagraphProps {
    children: React.ReactNode,
    type?: string
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