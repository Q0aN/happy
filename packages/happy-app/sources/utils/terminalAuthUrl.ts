export function extractTerminalPublicKey(url: string): string | null {
    const trimmed = url.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('happy://terminal?')) {
        const key = trimmed.slice('happy://terminal?'.length);
        return key || null;
    }

    try {
        const parsed = new URL(trimmed);
        if ((parsed.pathname === '/terminal/connect' || parsed.pathname === '/terminal') && parsed.hash.startsWith('#key=')) {
            return parsed.hash.slice('#key='.length);
        }

        if (parsed.pathname === '/terminal') {
            const keys = Array.from(parsed.searchParams.keys());
            return keys[0] || null;
        }
    } catch {
        return null;
    }

    return null;
}

export function normalizeTerminalAuthUrl(url: string): string | null {
    const key = extractTerminalPublicKey(url);
    return key ? `happy://terminal?${key}` : null;
}
