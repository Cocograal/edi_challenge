import hre from "hardhat";

async function main() {
  const { viem } = await hre.network.connect();

  const contract = await viem.getContractAt(
    "Badge",
    "0xE3dA210A2367FDd1e7Ad9E5cacb74Aa8F33891d0"
  );


  // Example: Minting a badge
  const recipient = "0xF69E35DCE5F25B4Cbb4090dD9577095E9e8A518b";
  const tokenURI = "https://my-token-json.vercel.app/badge.json";

  const txHash = await contract.write.mint([recipient, tokenURI]);

  console.log("Transaction sent:", txHash);

  const publicClient = await viem.getPublicClient();
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

  console.log("Transaction confirmed in block:", receipt.blockNumber);
}

main();