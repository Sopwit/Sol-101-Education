import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import { StructureDemo } from "../target/types/structure_demo";

describe("structure-demo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.structureDemo as Program<StructureDemo>;
  const authority = program.provider.publicKey;
  const [counterPda, counterBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter"), authority.toBuffer()],
    program.programId
  );

  it("initializes PDA counter with count=0", async () => {
    await program.methods
      .initialize()
      .accounts({
        counter: counterPda,
        authority,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const counterAccount = await program.account.counter.fetch(counterPda);
    assert.equal(counterAccount.count.toNumber(), 0);
    assert.equal(counterAccount.authority.toBase58(), authority.toBase58());
    assert.equal(counterAccount.bump, counterBump);
  });

  it("increments PDA counter to count=1", async () => {
    await program.methods
      .increment()
      .accounts({
        counter: counterPda,
        authority,
      })
      .rpc();

    const counterAccount = await program.account.counter.fetch(counterPda);
    assert.equal(counterAccount.count.toNumber(), 1);
  });
});
