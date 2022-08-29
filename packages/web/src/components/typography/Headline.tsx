import styles from './Headline.module.scss'

interface HeadlineProps {
    children: React.ReactNode,
    type?: 'mega' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
    collapse?: boolean,
}

export const Heading = ({ 
    children,
    type='h1',
    collapse,
}: HeadlineProps) => {

    const getClasses = [
        styles[type], 
        [collapse ? styles.collapse : null]
    ].join(' ');

    switch (type) {
        case 'mega': return <h1 className={getClasses}>{children}</h1>
        case 'h1': return <h1 className={getClasses}>{children}</h1>
        case 'h2': return <h2 className={getClasses}>{children}</h2>
        case 'h3': return <h3 className={getClasses}>{children}</h3>
        case 'h4': return <h4 className={getClasses}>{children}</h4>
        case 'h5': return <h5 className={getClasses}>{children}</h5>
        case 'h6': return <h6 className={getClasses}>{children}</h6>
        default: return <h1 className={getClasses}>{children}</h1>
    }
}