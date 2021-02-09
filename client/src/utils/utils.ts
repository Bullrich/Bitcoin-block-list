export function shortenHash(hash: string, length: number = 5): string {
    const cleanHash = hash.replace(/^0+/, '');
    return cleanHash.substr(0, length);
}