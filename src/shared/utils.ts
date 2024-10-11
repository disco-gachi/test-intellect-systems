export function extractIdFromResourceUrl (url: string) {
    const parsed = new URL(url);
    return parsed.pathname.split('/').filter(Boolean).pop();
}
