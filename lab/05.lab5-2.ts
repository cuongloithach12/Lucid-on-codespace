
// Lab 5-1: Register stakekey, check transaction

import { Blockfrost,Lucid,Data,Constr } from "https://deno.land/x/lucid@0.20.9/mod.ts";
import "jsr:@std/dotenv/load";

function utf8ToHex(str: string): string {
    return Array.from(str)
      .map((c: string) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }

// Lấy các biến từ env
const Bob_mnonic = Deno.env.get("MNEMONIC");
const BLOCKFROST_ID = Deno.env.get("BLOCKFROST_ID");
const BLOCKFROST_NETWORK = Deno.env.get("BLOCKFROST_NETWORK")

const lucid = new Lucid({
    provider: new Blockfrost(
      BLOCKFROST_NETWORK,
      BLOCKFROST_ID,
    ),
  });
lucid.selectWalletFromSeed(Bob_mnonic);

const rewardAddress = await lucid.wallet.rewardAddress();
// Delegate số lượng ADA có vào Pool có Pool_id=pool1j3x329u0uxh9s9vjvsad9kx37tzal8gndz6ttxumcz4nw947djw
const tx = await lucid.newTx()
// DelegVariant = "Abstain" | "NoConfidence" | { DRep: string } | { Pool: string };
  .delegateTo(rewardAddress,{Pool: "pool1j3x329u0uxh9s9vjvsad9kx37tzal8gndz6ttxumcz4nw947djw"})
  .commit();

const signedTx = await tx.sign().commit();
const txHash = await signedTx.submit();
// await Deno.writeTextFile("./cbor/delegateToPool.log", `cbor code: ${signedTx}` +"\n");
// await Deno.writeTextFile("./cbor/delegateToPool.log", `Bạn có thể kiểm tra giao dịch tại: https://preview.cexplorer.io/tx/${txHash}` + "\n", { append: true });
console.log(`Bạn có thể kiểm tra giao dịch tại: https://preview.cexplorer.io/tx/${txHash}`);