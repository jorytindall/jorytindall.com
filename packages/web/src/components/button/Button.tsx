import Link from 'next/link'
import styles from './Button.module.scss'
import { getClasses } from 'utils/getClasses'

interface ButtonProps {
    children: React.ReactNode,
    href?: string,
    variant?: 'primary' | 'secondary',
    size?: 'small' | 'default' | 'large',
}

export const Button = ({
    children = 'Button text',
    href,
    variant = 'primary',
    size = 'default'
}: ButtonProps) => {

    const classes = getClasses([
        styles[variant],
        styles[size]
    ])

    if (!href) {
        return <button className={classes}>{children}</button>
    } else if (href.includes('http')) {
        return (
            <Link href={href} passHref>
                <a className={classes}>{children}</a>
            </Link>
        )
    } else {
        return <a href={href} className={classes}>{children}</a>
    }
}