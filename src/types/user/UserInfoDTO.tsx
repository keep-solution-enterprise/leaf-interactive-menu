export interface UserInfoDTO {
    id: number,
    language: string,
    loyalties: ProductLoyaltyDTO[]
}

export interface ProductLoyaltyDTO {
    product_id: number,
    rest: number,
    free_given: boolean
}