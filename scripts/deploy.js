const path = require("path");

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which " +
        "gets automatically created and destroyed every time. Use the Hardhat " +
        "option '--network localhost'"
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log("Deploying the contracts with the account:", await deployer.getAddress());
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy MusicCoin und übergebe deployer als initialOwner
  const MusicCoin = await ethers.getContractFactory("MusicCoin");
  const musicCoin = await MusicCoin.deploy(deployer.address);
  await musicCoin.deployed();
  console.log("MusicCoin deployed to:", musicCoin.address);

  // Deploy MusicNFT und übergebe deployer als initialOwner
  const MusicNFT = await ethers.getContractFactory("MusicNFT");
  const musicNFT = await MusicNFT.deploy(deployer.address);
  await musicNFT.deployed();
  console.log("MusicNFT deployed to:", musicNFT.address);

  saveFrontendFiles(musicCoin, musicNFT);
}

function saveFrontendFiles(musicCoin, musicNFT) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  // Speichere die Adressen beider Contracts in einer JSON-Datei
  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(
      {
        MusicCoin: musicCoin.address,
        MusicNFT: musicNFT.address,
      },
      undefined,
      2
    )
  );

  // Artefakte speichern
  const musicCoinArtifact = artifacts.readArtifactSync("MusicCoin");
  fs.writeFileSync(
    path.join(contractsDir, "MusicCoin.json"),
    JSON.stringify(musicCoinArtifact, null, 2)
  );

  const musicNFTArtifact = artifacts.readArtifactSync("MusicNFT");
  fs.writeFileSync(
    path.join(contractsDir, "MusicNFT.json"),
    JSON.stringify(musicNFTArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
