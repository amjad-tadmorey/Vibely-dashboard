import { supabase } from "./supabase";
import { shop_id } from '../constants/local'
export async function getImages() {
    const { data: files, error } = await supabase
        .storage
        .from('logos')
        .list('', {
            limit: 1000,
        });

    if (error) {
        console.error('Error listing files:', error);
        return [];
    }

    // Filter files where the name ends with "-1" before the extension
    const matchingFiles = files.filter(file => {
        const nameWithoutExt = file.name.split('.').slice(0, -1).join('.');
        return nameWithoutExt.endsWith(`-${shop_id}`);
    });

    // Get public URLs
    return matchingFiles.map(file =>
        supabase
            .storage
            .from('logos')
            .getPublicUrl(file.name).data.publicUrl
    );
}
