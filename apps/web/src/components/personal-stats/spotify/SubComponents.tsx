import Image from 'next/image'
import { Badge } from "components/badge"
import { Paragraph } from 'components/typography'
import { StatCard } from '../shared'
import type { DisplayArtist, DisplayTrack } from 'lib/spotify/types';
import s from './SpotifyStats.module.css';

export const RenderGenre = (genre: string) => (
  <Badge
    key={genre}
    text={genre}
    type='primary'
  />
)

export const RenderArtist = (artist: DisplayArtist) => (
  <StatCard
    orientation='horizontal'
    padding='small'
    key={artist.name}
  >
    {artist.imageUrl && (
      <Image
        src={artist.imageUrl}
        alt={artist.name}
        width={32}
        height={32}
        className={s.image}
      />
    )}
    <Paragraph
      type='secondary'
      color='primary'
      collapse
    >{artist.name}</Paragraph>
  </StatCard>
)

export const RenderTrack = (track: DisplayTrack, index: number) => (
  <StatCard
    orientation='horizontal'
    padding='small'
    key={`${track.name}-${index}`}
  >
    {track.albumImageUrl && (
      <Image
        src={track.albumImageUrl}
        alt={track.name}
        width={32}
        height={32}
        className={s.image}
      />
    )}
    <div className={s.info}>
      <Paragraph
        type='secondary'
        color='primary'
        collapse
      >{track.name}</Paragraph>
      <Paragraph
        type='secondary'
        color='secondary'
        collapse
      >{track.artistName}</Paragraph>
    </div>
  </StatCard>
);