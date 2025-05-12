"use client";
import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionMessage,
  TransactionSignature,
  VersionedMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import idl from "@/idl/idl/smart_contract.json";
import { SmartContract } from "@/idl/types/smart_contract";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { Base64 } from "js-base64";
import { useAnchorWallet } from "@/hooks/useAnchorWallet";

//const anchorWallet = useAnchorWallet();

const programId = new PublicKey(idl.address);
const RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com";

export const getProvider = (
  publicKey: PublicKey | null,
  signTransaction: any,
  sendTransaction: any
): Program<SmartContract> | null => {
  if (!publicKey || !signTransaction) {
    console.error("Wallet not connected or missing signTransaction.");
    return null;
  }

  const connection = new Connection(RPC_URL);
  const provider = new AnchorProvider(
    connection,
    { publicKey, signTransaction, sendTransaction } as unknown as Wallet,
    { commitment: "processed" }
  );

  // Create program with IDL directly
  return new Program<SmartContract>(idl as any, provider);
};

export const getReadonlyProvider = (): Program<SmartContract> => {
  console.log("Creating read-only provider with RPC_URL:", RPC_URL);
  const connection = new Connection(RPC_URL, "confirmed");
  console.log("Connection created:", connection);

  // Use a dummy wallet for read-only operations
  const dummyWallet = {
    publicKey: PublicKey.default,
    signTransaction: async () => {
      throw new Error("Read-only provider cannot sign transactions.");
    },
    signAllTransactions: async () => {
      throw new Error("Read-only provider cannot sign transactions.");
    },
  };

  const provider = new AnchorProvider(connection, dummyWallet as any, {
    commitment: "processed",
  });
  console.log("Provider created:", provider);

  // Create program with IDL directly
  const program = new Program<SmartContract>(idl as any, provider);
  console.log("Program created:", program);
  return program;
};

export const getProviderWithKeypair = (
  publicKey: PublicKey | null,
  signTransaction: any,
  sendTransaction: any
): Program<SmartContract> | null => {
  if (!publicKey || !signTransaction) {
    console.error("Wallet not connected or missing signTransaction.");
    return null;
  }

  const connection = new Connection(RPC_URL);
  const provider = new AnchorProvider(
    connection,
    {
      publicKey: keypair.publicKey,
      signTransaction,
      sendTransaction,
    } as unknown as Wallet,
    { commitment: "processed" }
  );

  return new Program<SmartContract>(idl as any, provider);
};
const keypair = Keypair.generate();

export const initialize = async (
  program: Program<SmartContract>
): Promise<string> => {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  return await transact(async (wallet) => {
    // Authorize and get user's public key
    const authResult = await wallet.authorize({
      chain: "solana:devnet",
      identity: {
        name: "FoodZap",
        uri: "https://yourapp.com",
        icon: "/icon.png",
      },
    });

    // Decode the base64 string into a byte array
    const decodedBytes = Base64.toUint8Array(authResult.accounts[0].address);

    //console.log("Pub ID", decodedBytes);

    const userPublicKey = new PublicKey(decodedBytes);

    console.log("Pub Key", userPublicKey, programId);

    // Find PDAs
    const [counterPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("product")],
      programId
    );
    const [registerationsPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("cart")],
      programId
    );

    console.log("Found Program Address for Counter and Registerations");

    // Build transaction
    console.log("Calling initialize method...");
    const tx = await program.methods
      .initialize()
      .accountsPartial({
        user: userPublicKey,
        counter: counterPDA,
        registerations: registerationsPDA,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    console.log("Transaction built:", tx.instructions);

    // Fetch blockhash
    // const { blockhash } = await connection.getLatestBlockhash("confirmed");
    // console.log("Blockhash fetched:", blockhash);
    const block = await connection.getLatestBlockhashAndContext("confirmed");

    console.log(block);

    // const blockhash = await connection
    //   .getLatestBlockhash("confirmed")
    //   .then((result) => {
    //     return result.blockhash;
    //   });

    // console.log("Blockhash fetched:", blockhash);

    tx.recentBlockhash = "Hvak77GGNTqvmwgTFSRUc8p8EBeaNqwRfGt3Hn6Xu2cJ";
    tx.feePayer = userPublicKey;

    // Convert to versioned transaction
    const msg = tx.compileMessage();
    console.log("Message", msg);
    const vtx = new VersionedTransaction(msg);
    console.log("VTX", vtx);

    // Sign and send transaction using wallet
    const result = await wallet.signAndSendTransactions({
      transactions: [vtx],
    });

    console.log(result[0]);

    const signature = result[0];
    await connection.confirmTransaction(signature, "confirmed");

    console.log("Sign", signature);

    return signature;
  });
};
