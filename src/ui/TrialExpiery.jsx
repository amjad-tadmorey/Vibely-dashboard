import { useEffect } from "react";
import ExpireyMessage from "../components/ErrorMessage";
import { FREE_TRIAL_LIMIT, shop_id } from "../constants/local";
import { useGet } from "../hooks/remote/useGet";
import AppLayout from "./AppLayout";
import Spinner from "./Spinner";

export default function TrialExpirey() {

    useEffect(() => {
        if (shop_id === null) window.location.reload()
    }, [])


    const { data, isPending, error } = useGet('shops', {
        filters: [{ column: 'id', operator: 'eq', value: shop_id }],
        limit: 2,
        orderBy: { column: 'created_at', ascending: false },
    })

    if (isPending) return <Spinner />

    const shop = data[0]
    const isTrialExpired = (new Date() - new Date(shop.created_at)) / (1000 * 60 * 60 * 24) >= FREE_TRIAL_LIMIT;

    console.log(isTrialExpired);

    if (isTrialExpired && shop.status !== 'paid') return <ExpireyMessage />
    return <AppLayout />;
}