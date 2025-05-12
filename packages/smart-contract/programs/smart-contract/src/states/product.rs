use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct Product {
    pub name: String,
    pub description: String,
    pub category_id: u64,
    pub image_url: String,
    pub seller: Pubkey,
    pub slug: String,
    pub discount: u64,
    pub stock: u64,
    pub price: u64,
    pub quantity: u64,
}
