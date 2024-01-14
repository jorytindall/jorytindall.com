import { useState, useEffect, useRef, useCallback } from 'react';
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
} from 'react-icons/tb';
import styles from 'styles/components/audio/Playlist.module.scss';

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
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(80);
	const [muteVolume, setMuteVolume] = useState(false);

	const playAnimationRef = useRef();

	const repeat = useCallback(() => {
		const currentTime = audioRef.current.currentTime;
		setTimeProgress(currentTime);
		progressBarRef.current.value = currentTime;
		progressBarRef.current.style.setProperty(
			'--range-progress',
			`${(progressBarRef.current.value / duration) * 100}%`,
		);

		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [audioRef, duration, progressBarRef, setTimeProgress]);

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
			audioRef.current.volume = volume / 100)
	audioRef.current.muted = muteVolume;
}
	}, [volume, audioRef, muteVolume]);

return (
	<div className={styles.controlsWrapper}>
		<div className={styles.controls}>
			{tracks.length > 1 && (
				<>
					<button
						onClick={handlePrevious}
						className={styles.controlButtonSmall}
						aria-label="Previous track"
					>
						<TbPlayerSkipBackFilled />
					</button>
					<button
						onClick={skipBackward}
						className={styles.controlButtonSmall}
						aria-label="Skip backwards"
					>
						<TbPlayerTrackPrevFilled />
					</button>
				</>
			)}
			<button
				onClick={togglePlayPause}
				className={styles.controlButton}
				aria-label="Play track"
			>
				{isPlaying ? (
					<TbPlayerPauseFilled />
				) : (
					<TbPlayerPlayFilled />
				)}
			</button>
			{tracks.length > 1 && (
				<>
					<button
						onClick={skipForward}
						className={styles.controlButtonSmall}
						aria-label="Skip forwards"
					>
						<TbPlayerTrackNextFilled />
					</button>
					<button
						onClick={handleNext}
						className={styles.controlButtonSmall}
						aria-label="Next track"
					>
						<TbPlayerSkipForwardFilled />
					</button>
				</>
			)}
		</div>
		<div className={styles.volume}>
			<button
				onClick={() => setMuteVolume((prev) => !prev)}
				className={styles.controlButtonSmall}
				aria-label="Mute track"
			>
				{muteVolume || volume < 5 ? (
					<TbVolumeOff />
				) : volume < 40 ? (
					<TbVolume2 />
				) : (
					<TbVolume />
				)}
			</button>
			<input
				type="range"
				min={0}
				max={100}
				value={volume}
				onChange={(e) => setVolume(e.target.value)}
				className={styles.volumeSlider}
			/>
		</div>
	</div>
);
};
