export interface ProductDTO {
    id: number
    name: string
    category_id: number
    picture_url?: string
    price: number
}

export interface ProductRequestDTO {
    user_id: number,
    category_id: number
}