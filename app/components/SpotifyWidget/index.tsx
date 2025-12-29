'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './spotifywidget.module.css';
import Speaker from '@/app/icons/Speaker';
import { Skeleton } from '@radix-ui/themes';

type Track = {
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt?: string;
  addedAt?: string;
};

interface SpotifyWidgetProps {
  className?: string;
}

export default function SpotifyWidget({ className = '' }: SpotifyWidgetProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await fetch('/api/spotify');
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch Spotify data');
        }
        
        setTracks(data.tracks);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching Spotify data:', error);
        setError(error.message || 'Could not load Spotify tracks');
        setLoading(false);
      }
    };

    fetchLikedSongs();
  }, []);

  if (loading) {
    return (
      <div className={`${styles.spotifyContainer} ${className}`}>
        <div className={styles.header}>
          <Speaker style={{ color: 'var(--secondary)' }} size={20} />
          <h3 style={{ color: 'var(--secondary)' }}>On rotation</h3>
        </div>
        <div className={styles.trackListContainer}>
          <div className={styles.trackList}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={styles.trackItem}>
                <Skeleton height="48px" width="48px" style={{ borderRadius: '4px' }} />
                <div className={styles.trackInfo}>
                  <Skeleton height="16px" width="120px" style={{ borderRadius: '4px' }} />
                  <Skeleton height="14px" width="80px" style={{ borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.spotifyContainer} ${className}`}>
        <div className={styles.header}>
          <Speaker style={{ color: 'var(--secondary)' }} size={20} />
          <h3 style={{ color: 'var(--secondary)' }}>On rotation</h3>
        </div>
        <div className={styles.errorState}>
          {error}
          <p className={styles.errorHelp}>Check the browser console for more details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.spotifyContainer} ${className}`}>
      <div className={styles.header}>
        <Speaker style={{ color: 'var(--secondary)' }} size={20} />
        <h3 style={{ color: 'var(--secondary)' }}>On rotation</h3>
      </div>
      <div className={styles.trackListContainer}>
        <div className={styles.trackList}>
          {tracks.map((track, index) => (
            <a 
              key={index} 
              href={track.songUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.trackItem}
            >
              <Image 
                src={track.albumImageUrl} 
                alt={`${track.title} album cover`} 
                className={styles.albumCover}
                width={48}
                height={48}
              />
              <div className={styles.trackInfo}>
                <p className={styles.trackTitle}>{track.title}</p>
                <small>{track.artist}</small>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 