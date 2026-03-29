import hre from "hardhat";

async function main() {
  const { viem } = await hre.network.connect();

  const contract = await viem.getContractAt(
    "Counter",
    "0x6ca17215054A1C73894198B5fdF792667bbd4D57"
  );

  // Listen to Increment events
  contract.watchEvent.Increment({
    onLogs: (logs) => {
      for (const log of logs) {
        console.log("Increment event fired:", log.args.by.toString());
      }
    },
    // optional settings
    fromBlock: 0n, // start watching from block 0
    pollingInterval: 2000, // check every 2 seconds
  });
}

main();