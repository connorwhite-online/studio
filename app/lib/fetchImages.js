import supabase from './supabaseClient.js';

export default async function fetchImages() {
    const { data, error } = await supabase.storage.from
        .from('media')
        .list('', { limit: 100 })
        
    if (error) {
        console.error('Error fetching media:', error);
        return { images: [] };
    }

    console.log(data);

    // const images = data.map((image) => {
    //     return `${supabase.storageUrl}/media/${image.name}`
    // });

    console.log(images[0]);

    // return { images };
}