import { getSanityFileUrl } from 'utils/getSanityFileUrl';
import styles from 'styles/components/audio/Playlist.module.scss'
import { Paragraph } from 'components/typography';

interface DisplayTrackProps {
  currentTrack: any,
  audioRef: any,
  setDuration: any,
  progressBarRef: any,
}

export const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
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
      />
      <div className={styles.audioInfo}>
        <Paragraph type="secondary">{currentTrack.title}</Paragraph>
        <Paragraph type="secondary">{currentTrack.artist}</Paragraph>
      </div>
    </div>
  )
};