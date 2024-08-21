import { create, createV1 } from "@metaplex-foundation/mpl-core"
import { createCoreCollection } from "./createCollection"
import { umiConfig } from "./umiConfig"
import { generateSigner, publicKey } from "@metaplex-foundation/umi"
import { CreateCollection, CreateNft } from "src/types/nftCreationTypes"
import { uploadMetadata } from "./uploadMetadata"
import { base58 } from "@metaplex-foundation/umi/serializers"

export const createNft = async(metadata: CreateNft): Promise<any> => {
    try{
        const umi = await umiConfig()
        const uri = await uploadMetadata(metadata)

        if(!umi || !uri){
            throw new Error("An errow occurred. check your internet connection.")
        }

        const asset = generateSigner(umi)

        const tx = await createV1(umi, {
            name: metadata.equipmentName,
            uri,
            asset: asset,
            collection: publicKey(metadata.collectionPubkey),
            authority: umi.identity,
        }).sendAndConfirm(umi)

        const assetPubkey = asset.publicKey

        const transaction = base58.deserialize(tx.signature)[0]

        return {
            assetPubkey,
            uri,
            transaction
        }

    } catch(error){
        throw new Error("An errow occurred while creating collection. try again")
    }
}