export interface DecryptionRepositoryInterface {
    decrypt(passphrase: string,token: string);
}