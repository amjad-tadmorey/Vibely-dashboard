import { useQuery } from "@tanstack/react-query";
import { getImages } from "../../lib/getImages";

export function useImages() {
    return useQuery({
        queryKey: ["images", 'logos'],
        queryFn: getImages,
        staleTime: 5 * 60 * 1000,
    });
}
