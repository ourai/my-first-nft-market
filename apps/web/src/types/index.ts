type Address = string;

type NftItem = {
  seller: Address;
  contract: Address;
  tokenId: number;
  price: bigint;
}

export type { Address, NftItem }
