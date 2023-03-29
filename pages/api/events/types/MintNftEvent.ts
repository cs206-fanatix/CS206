export interface MintingEvent {
  mintPrice: number,
  ticketDetails: {
    collectionAddress: string,
    ticketName: string,
    ticketSymbol: string,
    ticketDescription: string,
    ticketImage: string,
    ticketRoyalties: number,
    attributes: { trait_type: string, value: string }[] | undefined
    creators: { creatorAddress: string; share: number; }[],
  }
  minter: string
}
