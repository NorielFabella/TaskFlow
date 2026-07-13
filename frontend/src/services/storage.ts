export function load<T>(
    key: string,
    fallback: T
): T {
    try {
        const item = localStorage.getItem(key);

        return item
            ? JSON.parse(item)
            : fallback;
    } catch {
        return fallback;
    }
}

export function save<T>(
    key: string,
    value: T
) {
    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}

export function remove(key: string) {
    localStorage.removeItem(key);
}

export function clear() {
    localStorage.clear();
}