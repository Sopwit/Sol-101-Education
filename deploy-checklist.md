# 08 - Deploy Checklist

## Prerequisites
- Solana CLI is installed and configured.
- Anchor CLI is installed.
- Wallet has enough SOL on target cluster.
- `Anchor.toml` cluster matches your target.

## Safe Deploy Flow
1. Build program:
   - `anchor build`
2. Run tests:
   - `anchor test`
3. Deploy program:
   - `anchor deploy`
4. Record Program ID from deploy output.
5. Verify keypair-derived Program ID:
   - `solana address -k target/deploy/structure_demo-keypair.json`
6. Verify on-chain program account:
   - `solana program show <PROGRAM_ID>`

## After Deploy
- Update frontend program ID in app config.
- Re-run integration tests against chosen cluster if needed.
- Keep deploy logs for traceability.
