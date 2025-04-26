use anchor_lang::prelude::*;

declare_id!("4b3JKLWB4S6Xc1RTC22dtgksxSEzcordsMSZsUcWS5BN");

#[program]
pub mod smart_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
