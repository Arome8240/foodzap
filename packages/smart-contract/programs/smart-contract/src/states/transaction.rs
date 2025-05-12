use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct Transaction {
    pub id: u64,
    pub user_id: Pubkey,
    pub price: u64,
    pub status: String,
    pub created_at: i64,
}
