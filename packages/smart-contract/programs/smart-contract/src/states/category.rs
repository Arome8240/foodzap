use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct Category {
    pub id: u64,
    pub name: String,
    pub slug: String,
    pub created_at: i64,
}
