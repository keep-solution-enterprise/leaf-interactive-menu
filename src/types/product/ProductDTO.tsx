export interface ProductDTO {
    id: number,
    name: string,
    picture_url?: string,
    price: number
}

export interface ProductRequestDTO {
    user_id: number,
    category_id: number
}