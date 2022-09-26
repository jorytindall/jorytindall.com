import Image from 'next/image'
import { useNextSanityImage } from "next-sanity-image"
import { sanityClient } from 'lib/sanity.server'
import { Container } from "components/layout"
import { Headline, Paragraph } from 'components/typography'
import styles from 'styles/components/Features.module.scss'

interface FeatureItemProps {
    image: string,
    title: string,
    description: string,
}

export const FeatureItem = ({ image, title, description }: FeatureItemProps) => {

    const imageProps = useNextSanityImage(
        sanityClient,
        image,        
    )

    return (
        <>
            <Container
                isFlex
                flexDirection='column'
                semanticElement='div'
                density='collapse'
            >
                {image && <Image {...imageProps} layout='intrinsic' className='imageWrapper' />}
                {title && <Headline type='h5'>{title}</Headline>}
                {description && <Paragraph type='primary' collapse>{description}</Paragraph>}
            </Container>
        </>
    )
}