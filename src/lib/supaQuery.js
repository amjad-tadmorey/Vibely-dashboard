import { shop_id } from "../constants/local"
import { supabase } from "./supabase"


const applyFilters = (query, filters = []) => {
    filters.forEach(({ column, operator, value }) => {
        query = query[operator](column, value)
    })
    return query
}

// 🟢 SELECT
export const supaQuery = async (table, options = {}) => {
    try {
        let { filters = [], limit, offset, orderBy, single = false } = options
        let query = supabase.from(table).select('*')
        // Auto-inject shop_id for feedbacks
        if (table === "feedbacks") {
            if (!shop_id) throw new Error("shop_id is required for feedback queries")
            filters.push({ column: "shop_id", operator: "eq", value: shop_id })
        }

        query = applyFilters(query, filters)

        if (orderBy) {
            query = query.order(orderBy.column, { ascending: orderBy.ascending })
        }
        if (limit) query = query.limit(limit)
        if (offset) query = query.offset(offset)
        if (single) query = query.single()

        const { data, error } = await query
        if (error) throw error
        return data
    } catch (err) {
        console.log("supa", err);
    }
}

// 🟢 INSERT
export async function supaInsert(table, payload) {
    try {
        if (table === "feedbacks") {
        if (!shop_id) throw new Error("shop_id is required for inserting feedback")
        payload = { ...payload, shop_id }
    }

    const { data, error } = await supabase.from(table).insert(payload).select()
    if (error) throw error
    return data
    } catch (err) {
        console.log("supa", err);
    }
}

// 🟢 DELETE
export async function supaDelete(table, match) {
    try {
        if (table === "feedbacks") {
        if (!shop_id) throw new Error("shop_id is required for deleting feedback")
        match = { ...match, shop_id }
    }

    const { data, error } = await supabase.from(table).delete().match(match)
    if (error) throw error
    return data
    } catch (err) {
        console.log("supa", err);
    }
}

// 🟢 UPDATE
export async function supaUpdate(table, match, updates) {
    try {
        if (table === "feedbacks") {
        if (!shop_id) throw new Error("shop_id is required for updating feedback")
        match = { ...match, shop_id }
    }

    const { data, error } = await supabase.from(table).update(updates).match(match)
    if (error) throw error
    return data
    } catch (err) {
        console.log("supa", err);
    }
}
