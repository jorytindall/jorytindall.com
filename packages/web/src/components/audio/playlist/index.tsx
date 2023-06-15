import { useRef, useState } from 'react'
import { AudioProps } from 'components/audio/audio';
import styles from 'styles/components/audio/Playlist.module.scss'

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

  const [ trackIndex, setTrackIndex ] = useState(0);
  const [ currentTrack, setCurrentTrack ] = useState(tracks[trackIndex])
  const [ timeProgress, setTimeProgress ] = useState(0)
  const [ duration, setDuration ] = useState(0)

  const audioRef = useRef()
  const progressBarRef = useRef()

  const handleNext = () => {
    if (trackIndex >= tracks.length -1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <div className={styles.audioPlayer}>
      <DisplayTrack
        {...{
          currentTrack,
          audioRef,
          setDuration,
          progressBarRef,
          handleNext,
          tracks,
          trackIndex
        }}
      />
      <ProgressBar
        {...{
          progressBarRef,
          audioRef,
          timeProgress,
          duration,
        }}
      />
      <Controls 
        {...{
          audioRef,
          progressBarRef,
          duration,
          setTimeProgress,
          tracks,
          trackIndex,
          setTrackIndex,
          setCurrentTrack,
          handleNext
        }} />
    </div>
  )
}