import * as anchor from "@coral-xyz/anchor";

const programId = new anchor.web3.PublicKey("EJ2ocRi8zWj31Emzxw5MWDLDAFPe8wrJkk8VVFVqVAyR");
const authorityArg = process.argv[2];
const authority = authorityArg
  ? new anchor.web3.PublicKey(authorityArg)
  : anchor.web3.Keypair.generate().publicKey;

if (!authorityArg) {
  console.log("No authority provided. Using a random authority for demo.");
}

const [counterPda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from("counter"), authority.toBuffer()],
  programId
);

console.log("Program ID:", programId.toBase58());
console.log("Authority:", authority.toBase58());
console.log("Counter PDA:", counterPda.toBase58());
console.log("Bump:", bump);
