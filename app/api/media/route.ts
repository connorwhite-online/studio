import { NextResponse } from 'next/server';
import { getMediaItemsFromFile } from '@/lib/media';

// Set revalidation time (disabled for development)
// export const revalidate = 3600; // 1 hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    
    const mediaItems = await getMediaItemsFromFile(limit);
    
    return NextResponse.json({ 
      mediaItems,
      count: mediaItems.length
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Error in media API route:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch media items',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache'
      }
    });
  }
} 