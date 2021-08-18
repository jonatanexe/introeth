// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // [signer] descontruye un array tomando el primer elemento y colocándolo en signer
  // const [signer] = await hre.ethers.getSigners();
  
  // Para probar el require owner
  const [martin, juana, lito] = await hre.ethers.getSigners();


  
  // Al traer el artefacto podemos especificar el sender, sino toma el primero por defecto
  const Ownable = await hre.ethers.getContractFactory("Ownable");
  // We get the contract to deploy
  // const ownable = await Ownable.deploy(signer.address);
  
  // Para probar el require owner
  const ownable = await Ownable.deploy(lito.address);

  await ownable.deployed();

  console.log("Ownable deployed to:", ownable.address);
  const foo = await ownable.owner();
  console.log("Este es el owner:", foo);

  // const send = await ownable.msg.sender();
  // console.log("Este es el send:", send);
  
  // Para probar el require owner
  await ownable.transferOwnership(juana.address);
  const bar = await ownable.owner();
  console.log("Este es el nuevo owner:", bar);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
