use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct ProductRating {
    pub product_id: u64,
    pub user_id: Pubkey,
    pub rating: u8,
    pub review: String,
    pub created_at: i64,
}
