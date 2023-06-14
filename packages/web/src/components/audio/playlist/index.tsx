import { useRef, useState } from 'react'
import { AudioProps } from 'components/audio';
import styles from 'styles/components/audio/Playlist.module.scss'
import { getSanityFileUrl } from 'utils/getSanityFileUrl';

import { DisplayTrack } from './DisplayTrack';
import { ProgressBar } from './ProgressBar';
import { Controls } from './Controls';

interface PlaylistProps {
  title?: string;
  tracks: AudioProps[];
  artwork?: any;
}

export const Playlist = ({
  tracks,
  title,
}: PlaylistProps) => {

  const [ currentTrack, setCurrentTrack ] = useState(tracks[0])
  const [ timeProgress, setTimeProgress ] = useState(0)
  const [ duration, setDuration ] = useState(0)

  const audioRef = useRef()
  const progressBarRef = useRef()

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.inner}>
        <DisplayTrack
          {...{
            currentTrack,
            audioRef,
            setDuration,
            progressBarRef,
          }}
        />
        <Controls audioRef={audioRef} />
        <ProgressBar
          {...{
            progressBarRef,
            audioRef,
            timeProgress,
            duration,
          }}
        />
      </div>
    </div>
  )
}