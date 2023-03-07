export function getFileFormat(str: string): string {
    if (!str) return '';
    return str.slice(-4);
}

export const formatAddress = (str: string): string => {
    if (!str) return '';
    return str.slice(0, 4) + "..." + str.slice(-4);
}

export const trimText = (text: string, limit: number): string => {
    if (text.length > limit) {
        return text.substring(0, limit - 3) + "...";
    } else {
        return text;
    }
}