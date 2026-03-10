# 08 - Verify Commands

## Cluster and Wallet
- `solana config get`
- `solana address`
- `solana balance`

## Program Build/Test/Deploy
- `anchor build`
- `anchor test`
- `anchor deploy`

## Program ID Verification
- `solana address -k target/deploy/structure_demo-keypair.json`
- `solana program show <PROGRAM_ID>`

## IDL and Types Refresh
- `anchor build`
- Check IDL file:
  - `cat target/idl/structure_demo.json | head`

## Optional Devnet Airdrop
- `solana airdrop 2 <WALLET_PUBKEY> --url devnet`
