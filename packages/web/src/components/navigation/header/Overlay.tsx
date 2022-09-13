import Link from 'next/link'
import { getClasses } from 'utils/getClasses'
import { Headline } from 'components/typography'
import { FeaturedItem } from './FeaturedItem'
import styles from 'styles/components/navigation/Header.module.scss'

interface OverlayProps {
    overlay?: any,
}

export const Overlay = ({ overlay }: OverlayProps) => {
    const classes = getClasses([styles[overlay]])

    return (
        <div className={classes}>
             
        </div>
    )
}