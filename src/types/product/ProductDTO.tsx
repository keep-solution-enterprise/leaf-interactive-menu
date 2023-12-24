export interface ProductDTO {
    id: number,
    name: string,
    loyalty_count: number | null
    picture_url?: string,
    price: number
}

export interface ProductRequestDTO {
    user_id: number,
    category_id: number
}