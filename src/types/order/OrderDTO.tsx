
export interface OrderCreateRequestDTO{
    user_telegram_id: number,
    branch_id: number
}
export interface OrderCreateRequestItem{
    productId: number,
    count: number
}