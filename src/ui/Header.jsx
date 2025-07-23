import { shop_id } from '../constants/local'
import { useGetOne } from '../hooks/remote/useGetOne'
export default function Header() {
    const { data: shop, isPending } = useGetOne(
        'shops',            // table name
        'shops',             // query key (for caching)
        [{ column: 'id', operator: 'eq', value: shop_id }] // filters
    )

    if (isPending) return null

    return (
        <div className="p-4 shadow-sm  bg-white/60 backdrop-blur-md">
            <h1 className="text-lg font-semibold">{shop.shop_name}</h1>
        </div>
    )
}
