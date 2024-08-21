import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

export const umiConfig = async () => {
    const rpc = process.env.RPC
    const privateKey = (process.env.SECRET_KEY)

    if(!privateKey || !rpc){
        throw new Error("An errow occurred. check your internet connection.")
    }

    const umi = createUmi(rpc, "finalized");

    let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(JSON.parse(privateKey)));
    const adminSigner = createSignerFromKeypair(umi, keypair);
    umi.use(signerIdentity(adminSigner));

    return umi
}