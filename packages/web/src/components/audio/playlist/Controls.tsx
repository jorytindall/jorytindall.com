import { 
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react'
import styles from 'styles/components/Playlist.module.scss'
import {
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbVolume,
  TbVolumeOff,
  TbVolume2,
} from 'react-icons/tb'

export const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
}) => {

  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ volume, setVolume ] = useState(80)
  const [ muteVolume, setMuteVolume ] = useState(false);

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress])

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  // Navigation between tracks
  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume])

  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.controls}>
        <button onClick={handlePrevious}>
          <TbPlayerSkipBackFilled />
        </button>
        <button onClick={skipBackward}>
          <TbPlayerTrackPrevFilled />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
        </button>
        <button onClick={skipForward}>
          <TbPlayerTrackNextFilled />
        </button>
        <button onClick={handleNext}>
          <TbPlayerSkipForwardFilled />
        </button>
      </div>
      <div className={styles.volume}>
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <TbVolumeOff />
          ) : volume < 40 ? (
            <TbVolume2 />
          ) : (
            <TbVolume />
          )}
        </button>
        <input
          type='range'
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  )
}