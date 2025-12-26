'use client';

import { useEffect, useState, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getNowPlaying } from 'actions/spotify-now-playing';
import type { NowPlayingData } from 'lib/spotify/types';
import styles from './NowPlaying.module.css';

const POLLING_INTERVAL = 30000; // 30 seconds

const emptySubscribe = () => () => {};

export const NowPlaying = () => {
	const isClient = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false
	);
	const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!isClient) return;

		async function fetchNowPlaying() {
			try {
				const data = await getNowPlaying();
				setNowPlaying(data);
			} catch (error) {
				console.error('Failed to fetch now playing:', error);
				setNowPlaying(null);
			}
		}

		fetchNowPlaying();
		intervalRef.current = setInterval(fetchNowPlaying, POLLING_INTERVAL);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isClient]);

	if (!isClient) {
		return null;
	}

	return (
		<AnimatePresence>
			{nowPlaying?.isPlaying && (
				<motion.a
					href={nowPlaying.spotifyUrl || '#'}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.nowPlaying}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.2 }}
				>
					{nowPlaying.albumImageUrl && (
						<Image
							src={nowPlaying.albumImageUrl}
							alt={nowPlaying.trackName || 'Album art'}
							width={32}
							height={32}
							className={styles.albumArt}
						/>
					)}
					<div className={styles.trackInfo}>
						<span className={styles.trackName}>{nowPlaying.trackName}</span>
						<span className={styles.artistName}>{nowPlaying.artistName}</span>
					</div>
					<div className={styles.playingBars}>
						<span className={styles.bar} />
						<span className={styles.bar} />
						<span className={styles.bar} />
					</div>
				</motion.a>
			)}
		</AnimatePresence>
	);
};
