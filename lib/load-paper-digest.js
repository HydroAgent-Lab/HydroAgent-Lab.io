import fs from "node:fs";
import path from "node:path";
import { normalizePapers } from "./paper-digest.mjs";

const SAMPLE = path.join("content", "data", "paper-digest.sample.json");

// Build-time only (server components and route handlers). Reads papers.json
// from PAPER_DIGEST_DATA, else from .digest-data/ where CI checks out
// HydroAgent-Lab/paper-digest-data. CI must never publish the sample: there a
// missing or broken file fails the build and Pages keeps the last good site.
// Local builds without the data fall back to the sample, with a warning.
export function loadPaperDigest() {
  const configured = process.env.PAPER_DIGEST_DATA;
  const file = path.resolve(process.cwd(), configured || path.join(".digest-data", "papers.json"));
  if (fs.existsSync(file)) {
    return { ...normalizePapers(JSON.parse(fs.readFileSync(file, "utf8"))), sample: path.resolve(SAMPLE) === file };
  }
  if (process.env.CI || configured) {
    throw new Error(`Paper Digest: no data at ${file}. CI checks out HydroAgent-Lab/paper-digest-data into .digest-data/.`);
  }
  console.warn(`Paper Digest: ${file} not found; using the sample data in ${SAMPLE}.`);
  return { ...normalizePapers(JSON.parse(fs.readFileSync(path.resolve(SAMPLE), "utf8"))), sample: true };
}
