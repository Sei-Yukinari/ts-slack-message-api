export async function retry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000, factor = 2): Promise<T> {
  let attempt = 0;
  let lastError: unknown;
  let wait = delayMs;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries - 1) {
        await new Promise((res) => setTimeout(res, wait));
        wait *= factor;
      }
    }
    attempt++;
  }
  throw lastError;
}
