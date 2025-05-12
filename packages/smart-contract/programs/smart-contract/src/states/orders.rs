use anchor_lang::prelude::*;

#[account]
#[derive(Default)]

pub struct Order {
    pub id: u64,
    pub user_id: Pubkey,
    pub total_price: u64,
    pub status: String,
    pub created_at: i64,
}
