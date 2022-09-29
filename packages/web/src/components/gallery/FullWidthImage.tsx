// @ts-nocheck
import Image from 'next/image'
import { useNextSanityImage } from "next-sanity-image"
import { sanityClient } from 'lib/sanity.server'
import styles from 'styles/components/gallery/FullWidthImage.module.scss'

interface FullWidthImageProps {
    input: {
        image: any,
        alternativeText: string,
    }
}


export const FullWidthImage = ({ input }: FullWidthImageProps) => {
    const { image, alternativeText } = input

    const imageProps = useNextSanityImage(
        sanityClient,
        image,
    )

    return (
        <Image {...imageProps} layout='intrinsic' alt={alternativeText} className={styles.fullWidthImage} />
    )
}