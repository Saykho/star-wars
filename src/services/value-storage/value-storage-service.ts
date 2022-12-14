import { ValueStorageKeys } from "./value-storage-keys";
import { LocalStorageServiceImpl } from "./local-storage-service";

export interface ValueStorageService {
    setItem(key: ValueStorageKeys, value: string): void;

    getItem(key: ValueStorageKeys): string | null;

    removeItem(key: ValueStorageKeys): void;

    clear(): void;

    // addFavoriteHeroId(heroId: number): void;
    //
    // getFavoriteHeroIds(): number[];
}

export const ValueStorageService: ValueStorageService = new LocalStorageServiceImpl();