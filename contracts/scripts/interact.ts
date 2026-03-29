import hre from "hardhat";

async function main() {
  // const { viem } = hre;
  const { viem } = await hre.network.connect();

  const contract = await viem.getContractAt(
    "Counter",
    "0x6ca17215054A1C73894198B5fdF792667bbd4D57"
  );


  // READ (free)
  const x = await contract.read.x();
  console.log("x =", x);

  // WRITE (costs gas)
  const tx = await contract.write.incBy([10n]);
  console.log("inc tx:", tx);
}

main();