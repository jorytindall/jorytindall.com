import { TbMusic } from 'react-icons/tb'
import { getSanityFileUrl } from 'utils/getSanityFileUrl';
import styles from 'styles/components/audio/Playlist.module.scss'

interface DisplayTrackProps {
  currentTrack: any,
  audioRef: any,
  setDuration: any,
  progressBarRef: any,
  handleNext: any,
  trackIndex: string
  tracks: any[]
}

export const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
  trackIndex,
  tracks
}: DisplayTrackProps) => {

  const track = getSanityFileUrl(currentTrack.file);

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div>
      <audio
        src={track.url}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className={styles.audioInfo}>
        <p className={styles.title}>{currentTrack.title}</p>
        <p className={styles.artist}>By {currentTrack.artist}</p>
        {tracks.length > 1 &&        
          <p className={styles.trackNumber}>
            <TbMusic />
            {trackIndex + 1} / {tracks.length}
          </p>
        }
      </div>
    </div>
  )
};