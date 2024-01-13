
export interface OrderCreateRequestDTO{
    user_telegram_id: number,
    branch_id: number,
    items: OrderCreateRequestItem[]
}
export interface OrderCreateRequestItem{
    product_id: number,
    category_id: number,
    count: number
}