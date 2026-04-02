import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import bannerManifest from '../src/lib/banner-manifest.json' with { type: 'json' };

const projectRoot = process.cwd();
const entries = Object.entries(bannerManifest);
const bannerSettingsPath = join(projectRoot, 'src', 'lib', 'banner-settings.json');

for (const [key, asset] of entries) {
  const outputPath = join(projectRoot, 'static', asset.local.replace(/^\//, ''));

  console.log(`Downloading ${key} -> ${asset.local}`);
  const response = await fetch(asset.remote);

  if (!response.ok) {
    throw new Error(`Failed to download ${key}: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buffer);
}

await writeFile(
  bannerSettingsPath,
  `${JSON.stringify({ useLocal: true }, null, 2)}\n`,
);

console.log(`Downloaded ${entries.length} banners to static/.`);
