/**
 * This is a utility script to check the scopes of your Spotify refresh token.
 * To use it:
 * 1. Run this script from the project root with: 
 *    npx ts-node --project tsconfig.json app/api/spotify/check-token.ts
 * 
 * This script automatically reads credentials from your .env.local file
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

// Spotify API credentials from .env.local
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Validate that we have all required credentials
if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('❌ Missing required Spotify credentials in .env.local file');
  console.error('Please ensure your .env.local file contains:');
  console.error('- SPOTIFY_CLIENT_ID');
  console.error('- SPOTIFY_CLIENT_SECRET');
  console.error('- SPOTIFY_REFRESH_TOKEN');
  process.exit(1);
}

async function checkTokenScopes() {
  try {
    console.log('Checking Spotify token scopes...');
    console.log(`Using credentials from .env.local file in: ${resolve(process.cwd(), '.env.local')}`);
    
    // Get access token
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN as string,
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      console.error('❌ Error getting access token:', tokenData);
      return;
    }
    
    console.log('✅ Successfully obtained access token');
    console.log('Token info:');
    console.log('- Expires in:', tokenData.expires_in, 'seconds');
    console.log('- Scopes:', tokenData.scope || 'No scope information returned');
    
    // Check if user-library-read scope is present
    const scopes = tokenData.scope?.split(' ') || [];
    if (!scopes.includes('user-library-read')) {
      console.error('❌ The token does NOT have the required user-library-read scope');
      console.error('This is why the liked songs endpoint is failing');
      console.log('\nPlease see the README.md file for instructions on how to generate a new token with the correct scope.');
      return;
    } else {
      console.log('✅ Found user-library-read scope');
    }
    
    // Test saved tracks endpoint
    const accessToken = tokenData.access_token;
    
    console.log('\nTesting saved tracks endpoint...');
    const savedTracksResponse = await fetch(
      'https://api.spotify.com/v1/me/tracks?limit=1',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    if (savedTracksResponse.ok) {
      console.log('✅ Successfully accessed saved tracks endpoint');
      const data = await savedTracksResponse.json();
      console.log(`Found ${data.items?.length || 0} tracks`);
      
      if (data.items?.length === 0) {
        console.log('\n⚠️ No saved tracks found');
        console.log('This could be because you don\'t have any liked songs in your Spotify library.');
      } else {
        const track = data.items[0].track;
        console.log(`Most recent liked track: "${track.name}" by ${track.artists.map((a: { name: string }) => a.name).join(', ')}`);
      }
    } else {
      console.error('❌ Error accessing saved tracks endpoint');
      const errorData = await savedTracksResponse.json();
      console.error(errorData);
      
      if (savedTracksResponse.status === 403) {
        console.log('\n⚠️ It appears your token lacks the user-library-read scope');
        console.log('Please generate a new token with this scope using the instructions in README.md');
      }
    }
    
  } catch (error) {
    console.error('Error running check:', error);
  }
}

// If running directly (not imported)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (typeof window === 'undefined' && isMainModule) {
  checkTokenScopes();
}

export default checkTokenScopes; 