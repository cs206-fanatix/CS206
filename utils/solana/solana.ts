import {bundlrStorage, keypairIdentity, Metaplex, NftClient, NftWithToken} from "@metaplex-foundation/js"
import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction,
  createVerifySizedCollectionItemInstruction,
  TokenStandard
} from '@metaplex-foundation/mpl-token-metadata';
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  MINT_SIZE,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import {Connection, Keypair, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { SignerWallet, sleep } from '@saberhq/solana-contrib';
import base58, {decode} from "bs58";
import {CreateCollectionEvent} from '../../pages/api/events/types/CreateCollectionEvent';
import {MintingEvent} from '../../pages/api/events/types/MintNftEvent';

const SolanaUtil = {
  getConnection(): Connection {
    return new Connection(process.env.RPC_URL as string);
  },

  async createCollection(event: CreateCollectionEvent): Promise<NftWithToken> {
    try {
      const escrowSigner = this.getEscrowSigner();
      const NftClient = this.getNftClient();
      const metadataUri = await this.uploadMetadataForCollection(NftClient, event)
      console.debug('metadataUri', metadataUri)
      const creators = event.collectionDetails.creators.map((creator) => {
        return {
          address: new PublicKey(creator.creatorAddress),
          share: creator.share / 100,
          authority: escrowSigner

        }
      })
      console.debug('metadataUri', metadataUri)
      const {nft} = await NftClient.create({
        uri: metadataUri,
        name: event.collectionDetails.collectionName,
        symbol: event.collectionDetails.collectionSymbol,
        sellerFeeBasisPoints: event.collectionDetails.collectionRoyalties,
        creators: creators.length > 0 ? creators : undefined,
        isCollection: true,
        mintTokens: true
      }, {commitment: "finalized"})

      return nft;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async uploadMetadataForCollection(nftClient: NftClient, event: CreateCollectionEvent) {
    // removed metadata below to pass linting
    const {uri} = await nftClient.uploadMetadata({
      name: event.collectionDetails.collectionName,
      symbol: event.collectionDetails.collectionSymbol,
      image: event.collectionDetails.collectionImage,
      seller_fee_basis_points: event.collectionDetails.collectionRoyalties,
      description: event.collectionDetails.collectionDescription,
      attributes: event.collectionDetails.attributes
    })

    return uri
  },

  async mint(body: MintingEvent): Promise<string> {

    try {
      const connection = this.getConnection();
      const escrowSigner = this.getEscrowSigner();
      const NftClient = this.getNftClient();
      const escrowAddress = escrowSigner.publicKey;
      const transaction = new Transaction()

      const collectionAddress = new PublicKey(body.ticketDetails.collectionAddress)
      const minterAddress = new PublicKey(body.minter)
      const ticketMint = Keypair.generate()
      const metadataUri = await this.uploadMetadataForTicket(NftClient, body)

      const ticketMetadataAccount = NftClient.pdas().metadata({ mint: ticketMint.publicKey })
      const ticketMasterEditionAccount = NftClient.pdas().masterEdition({ mint: ticketMint.publicKey })
      const collectionMetadataAccount = NftClient.pdas().metadata({ mint: collectionAddress })
      const collectionMasterEditionAccount = NftClient.pdas().masterEdition({ mint: collectionAddress })

      const minterAssociatedTokenAccountAddress = await getAssociatedTokenAddress(
        ticketMint.publicKey,
        minterAddress
      )

      const paymentInstruction = SystemProgram.transfer({
        fromPubkey: minterAddress,
        toPubkey: escrowAddress,
        lamports: body.mintPrice
      })

      const createMintAccountInstruction = SystemProgram.createAccount({
        fromPubkey: minterAddress,
        newAccountPubkey: ticketMint.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(MINT_SIZE),
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID
      })

      const initializeMintInstruction = createInitializeMintInstruction(
        ticketMint.publicKey,
        0,
        escrowAddress,
        escrowAddress
      )

      const createMinterAssociatedTokenAccountInstruction = createAssociatedTokenAccountInstruction(
        minterAddress,
        minterAssociatedTokenAccountAddress,
        minterAddress,
        ticketMint.publicKey
      )

      const mintToInstruction = createMintToInstruction(
        ticketMint.publicKey,
        minterAssociatedTokenAccountAddress,
        escrowAddress,
        1
      )

      const creators = body.ticketDetails.creators.map((creator) => {
        return {
          address: new PublicKey(creator.creatorAddress),
          share: creator.share,
          verified: true
        }
      })

      const metadataAccountCreateInstruction = createCreateMetadataAccountV3Instruction({
        metadata: ticketMetadataAccount,
        mint: ticketMint.publicKey,
        mintAuthority: escrowAddress,
        payer: escrowAddress,
        updateAuthority: escrowAddress
      }, {
        createMetadataAccountArgsV3: {
          data: {
            name: body.ticketDetails.ticketName,
            symbol: body.ticketDetails.ticketSymbol,
            uri: metadataUri,
            sellerFeeBasisPoints: body.ticketDetails.ticketRoyalties,
            creators: creators.length > 0 ? creators : null,
            collection: {
              key: collectionAddress,
              verified: false
            },
            uses: null
          },
          isMutable: true,
          collectionDetails: null
        }
      })

      const verifyCollectionInstruction = createVerifySizedCollectionItemInstruction({
        metadata: ticketMetadataAccount,
        collectionAuthority: escrowSigner.publicKey,
        payer: minterAddress,
        collectionMint: collectionAddress,
        collection: collectionMetadataAccount,
        collectionMasterEditionAccount: collectionMasterEditionAccount
      })

      const createMasterEditionAccountInstruction = createCreateMasterEditionV3Instruction({
        edition: ticketMasterEditionAccount,
        mint: ticketMint.publicKey,
        updateAuthority: escrowAddress,
        mintAuthority: escrowAddress,
        payer: minterAddress,
        metadata: ticketMetadataAccount
      }, {
        createMasterEditionArgs: {
          maxSupply: 0
        }
      })

      const instructions = [
        paymentInstruction,
        createMintAccountInstruction,
        initializeMintInstruction,
        createMinterAssociatedTokenAccountInstruction,
        mintToInstruction,
        metadataAccountCreateInstruction,
        verifyCollectionInstruction,
        createMasterEditionAccountInstruction
      ]

      instructions.forEach((instruction) => {
        transaction.add(instruction)
      })

      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
      transaction.feePayer = minterAddress
      transaction.partialSign(escrowSigner, ticketMint)

      const payerSecretKey: Uint8Array = Uint8Array.from(base58.decode(process.env.PAYER_SECRET_KEY as string));
      const payerKeypair = Keypair.fromSecretKey(payerSecretKey);
      const wallet = new SignerWallet(Keypair.fromSecretKey(payerSecretKey));
      console.log(payerKeypair.publicKey)
      // transaction.partialSign(payerKeypair);
      console.log(transaction);

      console.log('signed tx');
      const signed = await wallet.signTransaction(transaction);
      const blockhashResponse = await connection.getLatestBlockhashAndContext();
      const signature = await connection.sendRawTransaction(
        signed.serialize()
      );
      await connection.confirmTransaction(signature, "confirmed");
      console.log('confirmed tx');
      console.log(signature);

      return transaction.toString();
    } catch (e) {
      console.log(e);
      throw e;
    }
  },


  async uploadMetadataForTicket(nftClient: NftClient, mintingEvent: MintingEvent) {
    // removed metadata below to pass linting
    const { uri } = await nftClient.uploadMetadata({
      name: mintingEvent.ticketDetails.ticketName,
      symbol: mintingEvent.ticketDetails.ticketSymbol,
      image: mintingEvent.ticketDetails.ticketImage,
      seller_fee_basis_points: mintingEvent.ticketDetails.ticketRoyalties,
      description: mintingEvent.ticketDetails.ticketDescription,
      attributes: mintingEvent.ticketDetails.attributes
    })

    return uri
  },

  getNftClient(): NftClient {
    const connection = this.getConnection();

    const escrowSecretKey = process.env.ESCROW_SECRET_KEY as string
    const escrowSigner = Keypair.fromSecretKey(decode(escrowSecretKey))
    const escrowAddress = escrowSigner.publicKey

    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(escrowSigner))
      .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      }));

    return metaplex.nfts()
  },

  getEscrowSigner(): Keypair {
    const escrowSecretKey = process.env.ESCROW_SECRET_KEY as string
    return Keypair.fromSecretKey(decode(escrowSecretKey));
  }
};

export default SolanaUtil;
