import { AnchorProvider, Program } from "@coral-xyz/anchor";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey, Connection } from "@solana/web3.js";
import { COUNTER_PDA_IDL, PROGRAM_ID } from "./counterPdaIdl";

export const getCounterPda = (authority: PublicKey) =>
  PublicKey.findProgramAddressSync(
    [Buffer.from("counter"), authority.toBuffer()],
    new PublicKey(PROGRAM_ID)
  );

export const createProvider = (connection: Connection, wallet: WalletContextState) => {
  if (!wallet.publicKey) return null;
  return new AnchorProvider(connection, wallet as never, {
    commitment: "confirmed"
  });
};

export const createProgram = (provider: AnchorProvider) =>
  new Program(COUNTER_PDA_IDL, provider);
