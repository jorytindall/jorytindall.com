export const TrackList = ({
	tracks,
	currentTrack,
	setCurrentTrack,
	trackIndex,
	setTrackIndex,
}) => {
	console.log(tracks);

	const handleSetCurrentTrack = () => {
		console.log(trackIndex);
	};

	const list = tracks.map((track) => {
		return (
			<button key={track.title} onClick={handleSetCurrentTrack}>
				{track.title}
			</button>
		);
	});

	return list;
};
