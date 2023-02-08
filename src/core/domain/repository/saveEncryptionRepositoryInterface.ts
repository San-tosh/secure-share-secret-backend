export interface SaveEncryptionRepositoryInterface {
    save(encryptedContent: string,token: string, ttl:number,hash: string);
}