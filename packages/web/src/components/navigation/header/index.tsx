import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getClasses } from 'utils/getClasses'
import { Burger } from './Burger'
import { Overlay } from './Overlay'
import styles from 'styles/components/navigation/Header.module.scss'
import { Avatar } from 'components/avatar'

export const Header = () => {
    const [overlay, toggle] = useState(false)

    const classes = getClasses([styles.header])

    return (
        <header className={classes}>
            <Avatar />
            <Burger overlay={overlay} toggle={toggle} />
            <Overlay overlay={overlay} />
        </header>
    )
}