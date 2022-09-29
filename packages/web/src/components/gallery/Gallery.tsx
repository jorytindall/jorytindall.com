import { getClasses } from 'utils/getClasses'
import { GalleryItem } from './GalleryItem'
import styles from 'styles/components/gallery/Gallery.module.scss'

interface GalleryProps {
    input: {
        images: any[],
        columns: string,
        _key: string,
    }
}

export const Gallery = ({ input }: GalleryProps) => {

    const classes = getClasses([
        styles.wrapper,
        styles['columns-' + input.columns],
    ])

    const { _key, images } = input

    console.log(input)

    const galleryImages = images.map(image => {
        return (
            <GalleryItem
                key={image.key}
                image={image}
                altText={image.alternativeText}
                caption={image.caption}
            />
        )
    })

    return (
        <section className={classes} key={_key}>
            {galleryImages}
        </section>
    )
}