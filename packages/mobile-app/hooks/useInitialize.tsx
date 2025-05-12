import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { Base64 } from "js-base64";
import {
  Connection,
  PublicKey,
  SystemProgram,
  VersionedTransaction,
} from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import idl from "@/idl/idl/smart_contract.json";
import { SmartContract } from "@/idl/types/smart_contract";

const RPC_URL = "https://api.devnet.solana.com";
const programId = new PublicKey(
  require("@/idl/idl/smart_contract.json").address
);

export const useInitialize = async (
  program: Program<SmartContract>
): Promise<string> => {
  const connection = new Connection(RPC_URL, "confirmed");

  return await transact(async (wallet) => {
    const authResult = await wallet.authorize({
      chain: "solana:devnet",
      identity: {
        name: "Your App Name",
        uri: "https://yourapp.com",
        icon: "/icon.png",
      },
    });

    const userPublicKey = new PublicKey(
      Base64.toUint8Array(authResult.accounts[0].address)
    );
    const [counterPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("counter")],
      programId
    );
    const [registerationsPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("registerations")],
      programId
    );

    const tx = await program.methods
      .initialize()
      .accountsPartial({
        user: userPublicKey,
        counter: counterPDA,
        registerations: registerationsPDA,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    const block = await connection.getLatestBlockhashAndContext("confirmed");
    tx.recentBlockhash = block.value.blockhash;
    tx.feePayer = userPublicKey;

    const msg = tx.compileMessage();
    const vtx = new VersionedTransaction(msg);

    const result = await wallet.signAndSendTransactions({
      transactions: [vtx],
    });

    const signature = result[0];
    await connection.confirmTransaction(signature, "confirmed");
    return signature;
  });
};
