import Image from 'next/image'
import styles from 'styles/components/portfolio/HeroImage.module.scss'

interface HeroImageProps {
    source: string,
    altText: string,
}

export const HeroImage = ({ source, altText}:HeroImageProps) => {
    return (
        <section className={styles.heroWrapper}>
            <Image
                src={source}
                alt={altText}
                className={styles.heroImage}
                layout='fill'
            />
        </section>
    )
}