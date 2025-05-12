use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct Cart {
    pub user_id: Pubkey,
    pub product_id: u64,
    pub quantity: u64,
    pub price: u64,
    pub created_at: i64,
}
