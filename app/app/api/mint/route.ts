import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import abi from "@/lib/abi.json";
// import * as dotenv from "dotenv";

const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

const client = createWalletClient({
  account,
  transport: http(process.env.AMOY_RPC_URL),
}).extend(publicActions);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { form, imageUrl } = body;
    const metadata = {
      name: `${form.project} Badge`,
      description: form.details,
      image: imageUrl, // IFPS url
    };

    const tokenURI = `data:application/json;base64,${Buffer.from(
      JSON.stringify(metadata)
    ).toString("base64")}`;

    console.log("account.address:", account.address);
    console.log("form.wallet:", form.wallet);
    console.log("Contract:", process.env.BADGE_CONTRACT_ADDRESS);
    console.log("Token URI length:", tokenURI.length);

    const simulation = await client.simulateContract({
      address: process.env.BADGE_CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: "mint",
      args: [form.wallet, tokenURI],
      account,
    });
    
    const txHash = await client.writeContract(simulation.request);

    return NextResponse.json({ success: true, txHash });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Mint failed" });
  }
}