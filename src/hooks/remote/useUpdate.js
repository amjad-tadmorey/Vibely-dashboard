import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supaUpdate } from '../../lib/supaQuery'


export function useUpdate(table, invalidateKey = null) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ match, updates }) => supaUpdate(table, match, updates),
        onSuccess: () => {
            if (invalidateKey) {
                queryClient.invalidateQueries([invalidateKey])
            }
        },
    })
}