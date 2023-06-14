import { useState, useEffect } from 'react'
import styles from 'styles/components/Playlist.module.scss'
import {
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled
} from 'react-icons/tb'

export const Controls = ({ audioRef }) => {

  const [ isPlaying, setIsPlaying ] = useState(false)

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.controls}>
        <button>
          <TbPlayerSkipBackFilled />
        </button>
        <button>
          <TbPlayerTrackPrevFilled />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
        </button>
        <button>
          <TbPlayerTrackNextFilled />
        </button>
        <button>
          <TbPlayerSkipForwardFilled />
        </button>
      </div>
    </div>
  )
}