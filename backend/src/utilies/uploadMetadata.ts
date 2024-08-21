import { publicKey } from "@metaplex-foundation/umi"
import { umiConfig } from "./umiConfig"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

export const uploadMetadata = async(metaData:any) => {
    const umi = await umiConfig()
    const privateKey = (process.env.SECRET_KEY)

    if(!privateKey || !umi){
        throw new Error("An errow occurred. check your internet connection.")
    }

    umi.use(irysUploader())
    const balance = await umi.rpc.getBalance(publicKey(umi.identity))

    if (balance.basisPoints === BigInt(1) || !umi.uploader) {
        throw new Error("An errow occurred. try again")
    }

    const uri = await umi.uploader.uploadJson(metaData)

    if (!uri) {
        throw new Error("An errow occurred, while trying to upload your metadataa.")
    }
    return uri
}