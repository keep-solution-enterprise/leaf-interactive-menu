export interface UserInfoDTO {
    id: number,
    language: string,
    loyalties: LoyaltyDTO[]
}

export interface LoyaltyDTO {
    category_id: number,
    rest: number,
    free_given: boolean
}