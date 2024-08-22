const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("PrivateNFT");
  const contract = await contractFactory.deploy(deployer.address);
  await contract.waitForDeployment();
  const deployedContract = await contract.getAddress();
  fs.writeFileSync("contract.txt", deployedContract);
  console.log(`Contract: ${deployedContract}`);
}
// npx hardhat run scripts/deploy.js --network swisstronik
// node scripts/mint.js
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
