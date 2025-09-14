export default function keysToLowerCase<T>(obj: T): any {
  if (Array.isArray(obj)) {
    return obj.map(keysToLowerCase);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        key.toLowerCase(),
        keysToLowerCase(value),
      ])
    );
  }
  return obj;
}
