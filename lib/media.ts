export interface MediaItem {
  id: string;
  videoUrl: string;
  title?: string;
}

/**
 * Gets a list of local media items from the codebase
 * @param maxResults Maximum number of items to return
 * @returns Array of media items
 */
export function getLocalMedia(maxResults: number = 10): MediaItem[] {
  // In a client component, we can't directly import JSON files or use fs module
  // So this is a hardcoded version - in a real app, you might:
  // 1. Create an API endpoint that reads this file for you
  // 2. Use a data fetching library to load the JSON
  
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      videoUrl: '/media/manipulate.mov',
      title: 'Hand-Tracking'
    },
    {
      id: '2',
      videoUrl: '/media/sqft.mp4',
      title: 'Cursor-Tracking'
    },
    {
      id: '3',
      videoUrl: '/media/webgl-gallery.mov',
      title: 'WebGL Gallery'
    },
    {
      id: '4',
      videoUrl: '/media/tyb-sidenav.mp4',
      title: 'Side Nav'
    }
  ];

  return mediaItems.slice(0, maxResults);
}

/**
 * Server-side function to get media items
 * This can be used in API routes or Server Components
 */
export async function getMediaItemsFromFile(maxResults: number = 10): Promise<MediaItem[]> {
  try {
    // For server components or API routes, you can directly import the JSON
    const data = await import('../public/media/media.json');
    return (data.mediaItems as MediaItem[]).slice(0, maxResults);
  } catch (error) {
    console.error('Error loading media items:', error);
    return [];
  }
} 