
export interface OrderCreateRequestDTO{
    user_telegram_id: number,
    branch_id: number,
    items: OrderCreateRequestItem[]
}
export interface OrderCreateRequestItem{
    productId: number,
    count: number
}