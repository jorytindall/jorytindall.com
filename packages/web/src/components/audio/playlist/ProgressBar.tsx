import styles from 'styles/components/audio/ProgressBar.module.scss'

export const ProgressBar = ({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}) => {

  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  }

  return (
    <div className={styles.progress}>
      <span className="time current">{timeProgress}</span>
      <input
        type="range"
        className={styles.progressBar}
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span className="time">{duration}</span>
    </div>
  )
}