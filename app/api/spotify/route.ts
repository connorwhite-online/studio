import { NextResponse } from 'next/server';

// Spotify API credentials
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Get a new access token using the refresh token
async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Missing required Spotify credentials. Check your environment variables.');
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
    cache: 'no-store',
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Error getting access token:', data);
    throw new Error(`Error getting access token: ${data.error} - ${data.error_description}`);
  }
  
  return data.access_token;
}

// Get recently played tracks
async function getRecentlyPlayedTracks() {
  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=10',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify API error:', errorData);
      throw new Error(`Spotify API responded with ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return [];
    }
    
    return data.items.map((item: any) => ({
      title: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      albumImageUrl: item.track.album.images[0].url,
      songUrl: item.track.external_urls.spotify,
      playedAt: item.played_at
    }));
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return [];
  }
}

export async function GET() {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      return NextResponse.json({ 
        error: 'Server configuration error: Missing Spotify credentials' 
      }, { status: 500 });
    }
    
    const tracks = await getRecentlyPlayedTracks();
    
    if (!tracks.length) {
      return NextResponse.json({ error: 'No recently played tracks found or unable to fetch tracks' }, { status: 404 });
    }
    
    return NextResponse.json({ tracks });
  } catch (error: any) {
    console.error('Spotify API route error:', error);
    return NextResponse.json({ error: error.message || 'Unable to fetch tracks' }, { status: 500 });
  }
} 