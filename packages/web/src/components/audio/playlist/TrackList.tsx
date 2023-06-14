export const TrackList = ({ tracks, currentTrack, setCurrentTrack, trackIndex, setTrackIndex }) => {

  console.log(currentTrack)

  const handleSetCurrentTrack = ( tracks ) => {
    console.log(trackIndex)
    if (trackIndex === tracks[trackIndex]) {
      console.log('Yes!')
    } else {
      console.log('No!')
    }
  }

  const list = tracks.map(track => {
    return (
      <button
        key={track.title}
        onClick={handleSetCurrentTrack}
      >{track.title}</button>
    )
  })

  return list
}