import styles from './Headline.module.scss'

interface HeadlineProps {
    children: React.ReactNode,
    type?: 'mega' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
}

export const Heading = ({ 
    children,
    type='h1'
}: HeadlineProps) => {

    const renderHeadlineType = type === 'mega' ?
            <h1 className={[
                styles.headline,
                styles[`headline--${type}`],
            ].join(' ')}>{children}</h1>
        : type === 'h1' ? 
            <h1 className={[
                styles.headline,
                styles[`headline--${type}`],
            ].join(' ')}>{children}</h1>
        : type === 'h2' ?
            <h2 className={[
                styles.headline,
                styles[`headline--${type}`],
            ].join(' ')}>{children}</h2>
        : type === 'h3' ?
            <h3 className={[
                styles.headline,
                styles[`headline--${type}`],
            ].join(' ')}>{children}</h3>
        : type === 'h4' ?
            <h4 className={[
                styles.headline,
                styles[`headline--${type}`],
            ].join(' ')}>{children}</h4>
        : type === 'h5' ?
            <h5 className={[
                styles.headline,
                styles[`headline--${type}`],
            ].join(' ')}>{children}</h5>
        : type === 'h6' ?
            <h6 className={[
                styles.headline,
                styles[`headline--${type}`],
            ].join(' ')}>{children}</h6>
        : null;

    return renderHeadlineType
}