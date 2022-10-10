import handler from '@/lib/api/handler';
import { buildJarInfo } from '@/lib/api/jar';
import { categorize } from '@/lib/api/categories';

export default handler({
  get: async (req, res) => {
    const resources = await categorize(await buildJarInfo());
    const uncategorized = Object.values(resources).filter(c => c.category === 'uncategorized');
    const final = uncategorized.reduce((arr, i) => {
      arr[`${i.name} - ${i.group}`] = i;
      return arr;
    }, {});

    const categorized = Object.values(resources).filter(c => c.category !== 'uncategorized');

    req.db.updateTextureData(categorized);

    //res.json(final);
    res.json(resources);
  }
});