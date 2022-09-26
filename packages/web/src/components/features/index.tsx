import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient } from 'lib/sanity.server'
import { Headline, Paragraph } from 'components/typography'
import styles from 'styles/components/Features.module.scss'
import { Container } from 'components/layout'

interface FeaturesProps {
    input: {
        featureItems: {
            title: string,
            image: string,
            alternativeText: string
        }
        _key: string,
    }
}

export const Features = ({ input }:FeaturesProps) => {

    const { featureItems, _key } = input;

    const imageProps = (source) => useNextSanityImage(
        sanityClient,
        source,        
    )

    const mapFeatures = featureItems.map(item => {
        return (
            <div key={item._key}>
                {item.image && <Image {...imageProps(item.image)} layout='responsive' />}
                <Container
                    isFlex
                    flexDirection='column'
                    semanticElement='div'
                    density='collapse'
                >
                    {item.title && <Headline type='h5'>{item.title}</Headline>}
                    {item.description && <Paragraph type='primary' collapse>{item.description}</Paragraph>}
                </Container>
            </div>
        )
    })

    return (
        <section className={styles.wrapper}>
            {mapFeatures}
        </section>
    )
}