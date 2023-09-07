import { ethers } from "ether";
import {utils}

export async function makeSignature(signers: any, messageHash: string) {
  const signatures: any[] = await Promise.all(signers.map(async (wallet: any) => {
    let signature = wallet.signMessage(ethers.utils.arrayify(messageHash));
    return signature;
  }));
  return signatures;
}

export function makeHash(recipient: any,timestamp: any) {
  let concatenatedArgs = ethers.utils.solidityPack(["address", "uint256"], [
    recipient,
    timestamp
  ])
  const messageHashe = ethers.utils.keccak256(concatenatedArgs);
  return messageHashe;
}
