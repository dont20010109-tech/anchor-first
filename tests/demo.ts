import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Demo } from "../target/types/demo";
import { TOKEN_2022_PROGRAM_ID, getMint } from "@solana/spl-token";


describe("demo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const mint=anchor.web3.Keypair.generate()

  const program = anchor.workspace.demo as Program<Demo>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.createMint()
    .accounts({
      mint: mint.publicKey,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
    })
    .signers([mint])
    .rpc({commitment: "confirmed"});
    console.log("Your transaction signature", tx);

    const mintAccount=await getMint(
      program.provider.connection,
      mint.publicKey,
      "confirmed",
      TOKEN_2022_PROGRAM_ID
    )

    console.log("Mint Account", mintAccount)
  });
});
