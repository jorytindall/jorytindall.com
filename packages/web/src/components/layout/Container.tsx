import styles from './Container.module.scss'

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

    const getClasses = [
        styles[`density_${density}`],
        [isFlex === true ? styles[`is-flex`] : null],
        styles[`is-flex--${flexDirection}`],
        styles[`is-flex--${justify}`],
        styles[`is-flex--${align}`]
    ].join(' ')

    // console.log(getClasses)

    switch (semanticElement) {
        case 'div': return <div className={getClasses}>{children}</div>
        case 'section': return <section className={getClasses}>{children}</section>
        case 'article': return <article className={getClasses}>{children}</article>
        case 'aside': return <aside className={getClasses}>{children}</aside>
    }
}