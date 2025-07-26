import { shop_id } from '../constants/local'
import { useGetOne } from '../hooks/remote/useGetOne'
export default function Header() {
    const { data: shop, isPending } = useGetOne('shops', 'shops',
        [{ column: 'id', operator: 'eq', value: shop_id }]
    )

    if (isPending) return null

    return (
        <div className="p-4 shadow-sm  bg-white/60 backdrop-blur-md flex items-center gap-4">
            <img src={shop.logo} alt="" className='w-12' />
            <h1 className="text-lg font-semibold flex-1">{shop.shop_name}</h1>
            {/* <ThemeToggle /> */}
        </div>
    )
}
