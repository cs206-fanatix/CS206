export interface CreateCollectionEvent {
  collectionDetails: {
    collectionName: string,
    collectionSymbol: string,
    collectionDescription: string,
    collectionImage: string,
    collectionRoyalties: number,
    attributes: { trait_type: string, value: string }[] | undefined
    creators: { creatorAddress: string; share: number; }[],
  }
}
