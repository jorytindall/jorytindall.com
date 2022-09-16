import Link from 'next/link'
import styles from 'styles/components/navigation/Footer.module.scss'
import { Paragraph } from 'components/typography'
import { internalLinks, externalLinks } from './Links'
import { Avatar } from 'components/avatar'

export const Footer = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.copyright}>
                    <Link href='/'><a><Avatar /></a></Link>
                    <Paragraph collapse>Copyright &copy; Jory Tindall {new Date().getFullYear()}</Paragraph>
                </div>
                <div className={styles.internalLinks}>
                    {internalLinks.map(link => {
                        return (
                            <Link href={link.slug} key={link.text}>
                                <a className={styles.link}>{link.text}</a>
                            </Link>
                        )
                    })}
                </div>
                <div className={styles.externalLinks}>
                    {externalLinks.map(link => {
                        return (
                            <a target='_blank' href={link.href} className={styles.link} key={link.text}>{link.text}</a>
                        )
                    })}
                </div>
            </div>
        </footer>
    )
}