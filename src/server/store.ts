/**
 * Lightweight MVP persistence: appends records to JSON files under `.data/`.
 * Works in `npm run dev` and on a persistent Node host. On ephemeral serverless
 * (e.g. Vercel) writes are best-effort and may not survive between invocations —
 * which is fine for this approval MVP, since payment correctness comes from
 * Paymob's HMAC-verified callbacks, not from this store.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), ".data");

async function readAll(file: string): Promise<unknown[]> {
  try {
    const raw = await fs.readFile(path.join(DIR, file), "utf8");
    return JSON.parse(raw) as unknown[];
  } catch {
    return [];
  }
}

export async function append(file: string, record: unknown): Promise<void> {
  try {
    await fs.mkdir(DIR, { recursive: true });
    const all = await readAll(file);
    all.push(record);
    await fs.writeFile(path.join(DIR, file), JSON.stringify(all, null, 2), "utf8");
  } catch {
    // best-effort; ignore on read-only filesystems
  }
}

export async function findBy(
  file: string,
  predicate: (r: Record<string, unknown>) => boolean,
): Promise<Record<string, unknown> | undefined> {
  const all = (await readAll(file)) as Record<string, unknown>[];
  return all.find(predicate);
}

export async function upsertByKey(
  file: string,
  key: string,
  value: string,
  patch: Record<string, unknown>,
): Promise<void> {
  try {
    await fs.mkdir(DIR, { recursive: true });
    const all = (await readAll(file)) as Record<string, unknown>[];
    const idx = all.findIndex((r) => r[key] === value);
    if (idx >= 0) all[idx] = { ...all[idx], ...patch };
    else all.push({ [key]: value, ...patch });
    await fs.writeFile(path.join(DIR, file), JSON.stringify(all, null, 2), "utf8");
  } catch {
    // best-effort
  }
}
