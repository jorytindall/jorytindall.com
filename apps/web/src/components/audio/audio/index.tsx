import styles from 'styles/components/audio/Audio.module.scss'
import { Paragraph } from 'components/typography'
import { getSanityFileUrl } from 'utils/getSanityFileUrl';

interface AudioProps {
  title: string;
  file: {
    url: string;
  }
  artist: string;
}

export const Audio = ({
  title,
  file,
  artist,
}: AudioProps) => {

  const audioFile = getSanityFileUrl(file)

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Paragraph type='secondary' collapse><strong>{title}</strong></Paragraph>
        <Paragraph type='secondary' collapse>By {artist}</Paragraph>
      </div>
      <audio
        controls
        // @ts-ignore
        src={audioFile.url}
      >
        Download audio
      </audio>
    </div>
  )
}

export type { AudioProps }