import fs from 'fs/promises';
import path from 'path';
import getConfig from 'next/config';

export async function categorize(resource) {
  let categories = {};
  try {
    const { serverRuntimeConfig: { rootPath }} = getConfig();
    const categoryFile = path.resolve(rootPath, 'categories.json');
    categories = JSON.parse(await fs.readFile(categoryFile, 'utf8'));
  } catch (err) {
    console.error(err);
  }
  Object.values(resource).forEach(r => {
    const category = Object.keys(categories).find(c => categories[c].includes(r.name));
    r.category = category || 'uncategorized';
  });

  return resource;
}