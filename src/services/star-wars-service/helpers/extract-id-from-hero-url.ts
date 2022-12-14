export const extractIdFromHeroUrl = (url: string): number => {
    return +url.split("/")[5];
};