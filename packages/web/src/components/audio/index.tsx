import styles from 'styles/components/Audio.module.scss'
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
      <Paragraph type='primary'>{title}</Paragraph>
      <Paragraph type='primary'>{artist}</Paragraph>
      <audio
        controls
        src={audioFile.url}
      >
        Download audio
      </audio>
    </div>
  )
}

export type { AudioProps }