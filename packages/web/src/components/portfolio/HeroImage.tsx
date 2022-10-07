import Image from 'next/image'
import { sanityClient } from 'lib/sanity.server'
import { useNextSanityImage } from 'next-sanity-image'
import styles from 'styles/components/portfolio/HeroImage.module.scss'

interface HeroImageProps {
    source: string,
    altText: string,
}

export const HeroImage = ({ source, altText }:HeroImageProps) => {
    const imageProps:object = useNextSanityImage(
        sanityClient,
        source,
    )

    return (
        <section className={styles.heroWrapper}>
            <Image
                src={source}
                {...imageProps}
                alt={altText}
                layout='responsive'
            />
        </section>
    )
}