import styles from './Container.module.scss'

interface ContainerProps {
    density?: 'default' | 'spacious' | 'packed',
    isFlex?: boolean,
    flexDirection?: 'row' | 'column',
    semanticElement?: 'div' | 'section' | 'article' | 'aside',
    children?: React.ReactNode,
    justify?: 'normal' | 'start' | 'center' | 'end' | 'space-between' | 'space-around',
    align?: 'normal' | 'start' | 'center' | 'end',
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
        styles[`container--density_${density}`],
        [isFlex === true ? styles[`container--is-flex`] : null],
        styles[`container--is-flex--${flexDirection}`],
        styles[`container--is-flex--${justify}`],
        styles[`container--is-flex--${align}`]
    ].join(' ')

    // console.log(getClasses)

    switch (semanticElement) {
        case 'div': return <div className={getClasses}>{children}</div>
        case 'section': return <section className={getClasses}>{children}</section>
        case 'article': return <article className={getClasses}>{children}</article>
        case 'aside': return <aside className={getClasses}>{children}</aside>
    }
}