use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct OrderItem {
    pub order_id: u64,
    pub product_id: u64,
    pub sub_order_id: u64,
    pub quantity: u64,
    pub price: u64,
    pub created_at: i64,
}
