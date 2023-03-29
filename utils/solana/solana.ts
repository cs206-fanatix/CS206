import {TokenStandard} from '@metaplex-foundation/mpl-token-metadata';
import {CreateCollectionEvent} from '../../pages/api/events/types/CreateCollectionEvent';
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { decode } from "bs58";
import {
  bundlrStorage,
  BundlrStorageDriver,
  keypairIdentity,
  Metaplex,
  NftClient,
  NftWithToken
} from "@metaplex-foundation/js"

const SolanaUtil = {
  getConnection(): Connection {
    return new Connection(process.env.RPC_URL as string);
  },

  async createCollection(event: CreateCollectionEvent): Promise<NftWithToken> {
    const escrowSecretKey = process.env.ESCROW_SECRET_KEY as string
    const escrowSigner = Keypair.fromSecretKey(decode(escrowSecretKey))
    const escrowAddress = escrowSigner.publicKey

    const connection = this.getConnection();

    try {
      const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(escrowSigner))
        .use(bundlrStorage({
          address: 'https://devnet.bundlr.network',
          providerUrl: 'https://api.devnet.solana.com',
          timeout: 60000,
        }));

      const NftClient = metaplex.nfts()
      const metadataUri = await this.uploadMetadataForCollection(NftClient, event)
      console.debug('metadataUri', metadataUri)
      const creators = event.collectionDetails.creators.map((creator) => {
        return {
          address: new PublicKey(creator.creatorAddress),
          share: creator.share/100,
          authority: escrowSigner

        }
      })
      console.debug('metadataUri', metadataUri)
      const { nft } = await NftClient.create({
        uri: metadataUri,
        name: event.collectionDetails.collectionName,
        symbol: event.collectionDetails.collectionSymbol,
        sellerFeeBasisPoints: event.collectionDetails.collectionRoyalties,
        creators: creators.length > 0 ? creators : undefined,
        isCollection: true
      }, { commitment: "finalized" })
      console.debug('nft', nft)
      return nft;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async uploadMetadataForCollection(nftClient: NftClient, event: CreateCollectionEvent) {
    // removed metadata below to pass linting
    const { uri } = await nftClient.uploadMetadata({
      name: event.collectionDetails.collectionName,
      symbol: event.collectionDetails.collectionSymbol,
      image: event.collectionDetails.collectionImage,
      seller_fee_basis_points: event.collectionDetails.collectionRoyalties,
      description: event.collectionDetails.collectionDescription,
      attributes: event.collectionDetails.attributes
    })

    return uri
  }
};

export default SolanaUtil;
