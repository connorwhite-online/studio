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
    // Use fs to read the file directly to avoid import caching
    const fs = await import('fs');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), 'public', 'media', 'media.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return (data.mediaItems as MediaItem[]).slice(0, maxResults);
  } catch (error) {
    console.error('Error loading media items:', error);
    return [];
  }
} 