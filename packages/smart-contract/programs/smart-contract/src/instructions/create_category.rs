use crate::constants::ANCHOR_DISCRIMINATOR_SIZE;
use crate::states::*;
use anchor_lang::prelude::*;

pub fn create_category(ctx: Context<CreateCategory>, name: String, slug: String) -> Result<()> {
    let category = &mut ctx.accounts.category;
    let clock = Clock::get()?;
    category.name = name;
    category.slug = slug;
    category.created_at = clock.unix_timestamp;
    Ok(())
}

#[derive(Accounts)]
pub struct CreateCategory<'info> {
    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR_SIZE + Category::LEN,
        seeds = [b"category", name.as_bytes()],
        bump
    )]
    pub category: Account<'info, Category>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
impl Category {
    pub const LEN: usize = 8 + 4 + 4 + 8; // id + name + slug + created_at
}
