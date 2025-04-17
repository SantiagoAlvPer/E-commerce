import { IHashProvider } from 'src/common/domain/services/IHash.service';
export declare class HashProvider implements IHashProvider {
    private readonly _salt;
    compare(str: string, hashed: string): boolean;
    encrypt(str: string): string;
}
