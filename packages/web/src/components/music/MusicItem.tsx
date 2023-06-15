import Link from 'next/link'
import Image from 'next/image'
import { getSanityImageUrl } from 'utils/getSanityImage'
import { linkResolver } from 'utils/linkResolver'
import styles from 'styles/components/music/MusicItem.module.scss'

interface MusicItemProps {
  title: string,
  description?: string,
  image?: any,
  link: string,
}

export const MusicItem = ({
  title,
  description,
  image,
  link,
}: MusicItemProps) => {

  return (
    <Link
      href={linkResolver('musicProject', link)}
      className={styles.wrapper}
    >
      {image &&
        <div className={styles.imageWrapper}>
          <Image
            src={getSanityImageUrl(image)}
            alt={image.alternativeText}
            className={styles.featureImage}
            fill
          />
        </div>
      }
      <div className={styles.content}>
        <h3>{title}</h3>
        {description &&<p>{description}</p>}
      </div>
    </Link>
  )
}