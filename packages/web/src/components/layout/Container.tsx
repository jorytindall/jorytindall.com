import styles from './Container.module.scss'

interface ContainerProps {
    density?: 'default' | 'spacious' | 'packed',
    isFlex?: boolean,
    flexDirection?: 'row' | 'column',
    semanticElement?: 'div' | 'section' | 'article' | 'aside',
    children?: React.ReactNode,
    justify?: 'normal' | 'start' | 'center' | 'end' | 'space-between' | 'space-around',
}

export const Container = ({
    density = 'default',
    isFlex,
    flexDirection = 'row',
    justify = 'normal',
    semanticElement,
    children,
}: ContainerProps) => {
    switch (semanticElement) {
        case 'div': return (
            <div className={[
                styles[`container--density_${density}`],
                [isFlex === true ? styles[`container--is-flex`] : null],
                styles[`container--is-flex--${flexDirection}`],
                styles[`container--is-flex--${justify}`]
            ].join(' ')}
            >{children}</div>
        )
        case 'section': return <section>{children}</section>
        case 'article': return <article>{children}</article>
        case 'aside': return <aside>{children}</aside>
    }
}