import { ValueStorageKeys } from "./value-storage-keys";
import { ValueStorageService } from "./value-storage-service";

export class LocalStorageServiceImpl implements ValueStorageService {
    setItem(key: ValueStorageKeys, value: string): void {
        localStorage.setItem(key, value);
    }

    getItem(key: ValueStorageKeys): string | null {
        return localStorage.getItem(key);
    }

    removeItem(key: ValueStorageKeys): void {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }

    // addFavoriteHeroId(heroId: number): void {
    //     const favoriteHeroIds = this.getFavoriteHeroIds();
    //     favoriteHeroIds.push(heroId);
    //     const favoriteHeroIdsSet = new Set(favoriteHeroIds);
    //     this.setItem(ValueStorageKeys.FavoriteHeroIds, JSON.stringify(Array.from(favoriteHeroIdsSet)));
    // }
    //
    // getFavoriteHeroIds(): number[] {
    //     const heroIds = this.getItem(ValueStorageKeys.FavoriteHeroIds);
    //     return !heroIds ? [] : JSON.parse(heroIds);
    // }
}
