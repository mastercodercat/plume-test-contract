import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { TokenFactory__factory } from "../../src/types/factories/TokenFactory__factory";
import { TokenFactory } from "../../src/types/TokenFactory";

task("deploy:TokenFactory").setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
  const factory: TokenFactory__factory = <TokenFactory__factory>await ethers.getContractFactory("TokenFactory");
  const tokenFactory: TokenFactory = <TokenFactory>await upgrades.deployProxy(factory);
  await tokenFactory.deployed();
  console.log("TokenFactory deployed to: ", tokenFactory.address);
});

task("test:createERC20").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const contract = await ethers.getContractAt("TokenFactory", "0x1c072E86E43a5D5575f4C3EFf69c3fC71CeCB8cF");
  await contract.createERC20("ABC Testing", "ABC");
});

task("test:listTokens").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const contract = await ethers.getContractAt("TokenFactory", "0x1c072E86E43a5D5575f4C3EFf69c3fC71CeCB8cF");
  const list = await contract.listTokensByAddress("0xF1B3E0982E21661c41C70fdb2f58f77120EB66D0");
  console.log(list);
});
