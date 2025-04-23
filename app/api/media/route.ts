import { NextResponse } from 'next/server';
import { getMediaItemsFromFile } from '@/lib/media';

// Set revalidation time
export const revalidate = 3600; // 1 hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    
    // Log the request for debugging
    console.log('Media API: Fetching media items, limit:', limit);
    
    const mediaItems = await getMediaItemsFromFile(limit);
    
    // Log what we're returning
    console.log('Media API: Returning', mediaItems.length, 'items');
    if (mediaItems.length > 0) {
      console.log('Media API: First item:', JSON.stringify(mediaItems[0]));
    }
    
    return NextResponse.json({ 
      mediaItems,
      count: mediaItems.length
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
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