use anchor_lang::prelude::*;

declare_id!("EJ2ocRi8zWj31Emzxw5MWDLDAFPe8wrJkk8VVFVqVAyR");

#[program]
pub mod structure_demo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
