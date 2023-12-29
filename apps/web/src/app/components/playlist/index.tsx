import styles from 'styles/components/Playlist.module.scss'
import { Paragraph } from 'app/components/typography'
import { Audio } from 'app/components/audio/audio';

import { AudioProps } from 'app/components/audio/audio';

interface PlaylistProps {
  title: string;
  tracks: AudioProps[];
  artwork: any;
}

export const Playlist = ({
  title,
  tracks,
  artwork,
}: PlaylistProps) => {

  const renderTracks = tracks.map(track => {
    return (
      <Audio
        title={track.title}
        file={track.file}
        artist={track.artist}
        key={track.title}
      />
    )
  })

  return (
    <div className={styles.wrapper}>
      <Paragraph type='primary'>{title}</Paragraph>
      {renderTracks}
    </div>
  )
}