import { generateSigner } from "@metaplex-foundation/umi";
import { umiConfig } from "./umiConfig";
import { createCollection } from "@metaplex-foundation/mpl-core";
import { uploadMetadata } from "./uploadMetadata";
import { CreateCollection } from "src/types/nftCreationTypes";
import { base58 } from '@metaplex-foundation/umi/serializers';

export const createCoreCollection = async (metadata: CreateCollection): Promise<any> => {
    try {
        const umi = await umiConfig()
        const uri = await uploadMetadata(metadata)

        if (!umi || !uri) {
            throw new Error("An errow occurred. check your internet connection.")
        }

        const collection = generateSigner(umi);

        let tx = await createCollection(umi, {
            collection,
            name: metadata.shopName,
            uri: uri,
            plugins: [
                {
                    type: "PermanentFreezeDelegate",
                    frozen: true,
                    authority: { type: "None" }
                }
            ]
        }).sendAndConfirm(umi);

        const transaction = base58.deserialize(tx.signature)[0]
        
        return { transaction, collection, uri }

    } catch (error) {
        throw new Error("An errow occurred while creating collection. try again")
    }
}

