import styles from './Container.module.scss'
import { getClasses } from 'utils/getClasses'

interface ContainerProps {
    density?: 'default' | 'spacious' | 'packed',
    isFlex?: boolean,
    flexDirection?: 'row' | 'column',
    semanticElement?: 'div' | 'section' | 'article' | 'aside',
    children?: React.ReactNode,
    justify?: 'normal' | 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around',
    align?: 'normal' | 'flex-start' | 'center' | 'flex-end',
}

export const Container = ({
    density = 'default',
    isFlex,
    flexDirection,
    justify,
    semanticElement,
    children,
    align,
}: ContainerProps) => {

    const classes = getClasses([
        styles[`density_${density}`],
        [isFlex === true ? styles[`is-flex`] : null],
        styles[`is-flex--${flexDirection}`],
        styles[`is-flex--${justify}`],
        styles[`is-flex--${align}`]
    ])

    switch (semanticElement) {
        case 'div': return <div className={classes}>{children}</div>
        case 'section': return <section className={classes}>{children}</section>
        case 'article': return <article className={classes}>{children}</article>
        case 'aside': return <aside className={classes}>{children}</aside>
    }
}