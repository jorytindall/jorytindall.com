import Link from 'next/link'
import Image from 'next/image'
import styles from 'styles/components/navigation/Footer.module.scss'
import { Paragraph } from 'components/typography'
import { internalLinks, externalLinks } from './Links'
import avatarLogo from '../../../../public/avatar-logo.jpg'

export const Footer = () => {

    const renderInternalLinks = internalLinks.map(link => <Link href={link.slug} key={link.text}><a className={styles.link}>{link.text}</a></Link>)

    const renderExternalLinks = externalLinks.map(link => <a target='_blank' href={link.href} className={styles.link} key={link.text}>{link.text}</a>)

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.copyright}>
                    <Link href='/'>
                        <a>
                            <Image
                                src={avatarLogo}
                                className={styles.avatar}
                                width={60}
                                height={60}
                                layout='fixed'
                                alt='Picture of Jory Tindall'
                                quality={90}
                            />
                        </a>
                    </Link>
                    <Paragraph collapse>Copyright &copy; Jory Tindall {new Date().getFullYear()}</Paragraph>
                </div>
                <div className={styles.internalLinks}>
                    {renderInternalLinks}
                </div>
                <div className={styles.externalLinks}>
                    {renderExternalLinks}
                </div>
            </div>
        </footer>
    )
}