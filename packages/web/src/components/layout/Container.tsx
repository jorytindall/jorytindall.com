import styles from './Container.module.scss'

interface ContainerProps {
    density?: 'default' | 'spacious' | 'packed',
    isFlex?: boolean,
    flexDirection?: 'horizontal' | 'vertical',
    semanticElement?: 'div' | 'section' | 'article' | 'aside',
    children?: React.ReactNode,
}

export const Container = ({
    density = 'default',
    isFlex,
    flexDirection,
    semanticElement,
    children,
}: ContainerProps) => {
    switch (semanticElement) {
        case 'div': return (
            <div className={[
                styles.container,
                styles[`container--density_${density}`],
                styles[`container--${isFlex}`],
                styles[`container--${flexDirection}`]
            ].join(' ')}
            >{children}</div>
        )
        case 'section': return <section>{children}</section>
        case 'article': return <article>{children}</article>
        case 'aside': return <aside>{children}</aside>
    }
}