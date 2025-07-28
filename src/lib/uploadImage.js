import { shop_id } from "../constants/local";
import { supabase } from "./supabase";

export async function uploadImage(file, bucketName, pathInBucket = '') {
    try {
        if (!file) return { error: 'No file provided' }

        // Get file extension
        const fileExt = file.name.split('.').pop()

        // Remove dangerous characters from original name
        const baseName = file.name
            .replace(/\.[^/.]+$/, '')            // remove extension
            .replace(/[^a-zA-Z0-9_-]/g, '_')     // replace all non-safe characters with _
            .slice(0, 40)                        // optional: limit length

        const safeFileName = `${baseName}_${Date.now()}-${shop_id}.${fileExt}`
        const filePath = pathInBucket ? `${pathInBucket}/${safeFileName}` : safeFileName

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            })

        if (error) {
            console.error('Upload error:', error.message)
            return { error }
        }

        const { data: publicURLData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath)

        return {
            data,
            publicUrl: publicURLData?.publicUrl,
            path: filePath,
        }
    } catch (err) {
        console.log("supa", err);
    }
}
