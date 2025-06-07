export interface MediaItem {
  id: string;
  videoUrl: string;
  title?: string;
}

/**
 * Gets a list of local media items from the API
 * @param maxResults Maximum number of items to return
 * @returns Promise resolving to array of media items
 */
export async function getLocalMedia(maxResults: number = 10): Promise<MediaItem[]> {
  try {
    const response = await fetch(`/api/media?limit=${maxResults}`, {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.status}`);
    }
    
    const data = await response.json();
    return data.mediaItems || [];
  } catch (error) {
    console.error('Error fetching media items:', error);
    // Fallback to empty array if API fails
    return [];
  }
}

/**
 * Server-side function to get media items
 * This can be used in API routes or Server Components
 */
export async function getMediaItemsFromFile(maxResults: number = 10): Promise<MediaItem[]> {
  try {
    // Try file system first, then fallback to HTTP request
    const fs = await import('fs');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), 'public', 'media', 'media.json');
    
    // Add detailed logging for debugging production issues
    console.log('Media file path:', filePath);
    console.log('Current working directory:', process.cwd());
    
    // Check if file exists first
    if (!fs.existsSync(filePath)) {
      console.error('Media file does not exist at:', filePath);
      
      // Try to list directory contents for debugging
      const mediaDir = path.join(process.cwd(), 'public', 'media');
      if (fs.existsSync(mediaDir)) {
        const files = fs.readdirSync(mediaDir);
        console.log('Files in media directory:', files);
      } else {
        console.error('Media directory does not exist:', mediaDir);
        
        // Check if public directory exists
        const publicDir = path.join(process.cwd(), 'public');
        if (fs.existsSync(publicDir)) {
          const publicFiles = fs.readdirSync(publicDir);
          console.log('Files in public directory:', publicFiles);
        } else {
          console.error('Public directory does not exist:', publicDir);
        }
      }
      
      // Fallback: try to fetch from public URL
      console.log('Attempting fallback: fetching from public URL');
      return await getMediaItemsFromPublicUrl(maxResults);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    if (!data.mediaItems || !Array.isArray(data.mediaItems)) {
      console.error('Invalid media.json structure:', data);
      return [];
    }
    
    const items = (data.mediaItems as MediaItem[]).slice(0, maxResults);
    console.log(`Successfully loaded ${items.length} media items from file system`);
    
    return items;
  } catch (error) {
    console.error('Error loading media items from file system:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Fallback: try to fetch from public URL
    console.log('Attempting fallback after error: fetching from public URL');
    return await getMediaItemsFromPublicUrl(maxResults);
  }
}

/**
 * Fallback function to get media items from public URL
 * Used when file system access fails in production
 */
async function getMediaItemsFromPublicUrl(maxResults: number = 10): Promise<MediaItem[]> {
  try {
    // Determine the base URL - in production this should work with relative URLs
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NODE_ENV === 'production' 
        ? 'https://www.connorwhite.studio'
        : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/media/media.json`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch media.json from URL: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    if (!data.mediaItems || !Array.isArray(data.mediaItems)) {
      console.error('Invalid media.json structure from URL:', data);
      return [];
    }
    
    const items = (data.mediaItems as MediaItem[]).slice(0, maxResults);
    console.log(`Successfully loaded ${items.length} media items from public URL`);
    
    return items;
  } catch (error) {
    console.error('Error loading media items from URL:', error);
    return [];
  }
} 