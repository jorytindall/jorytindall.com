import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/components/Avatar.module.scss'
import avatarLogo from '../../../public/avatar-logo.png'

export const Avatar = () => {
    return (
        <Link href='/' passHref>
            <a>
                <div className={styles.avatar}>
                    <Image
                        src={avatarLogo}
                        layout='fixed'
                        width={60}
                        height={60}
                        quality={90}
                        priority={true}
                    />
                </div>
            </a>
        </Link>
    )
}

