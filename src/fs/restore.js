import fs from 'fs/promises';
import path from 'path';

const restore = async () => {
  // Write your code here
  // Read snapshot.json
  // Treat snapshot.rootPath as metadata only
  // Recreate directory/file structure in workspace_restored

  const restoredPath = path.resolve('workspace_restored');

  try {
    await fs.access('snapshot.json')
  } catch (e) {
    throw new Error('FS operation failed');
  } 

  const snapshot = JSON.parse(await fs.readFile('snapshot.json', 'utf-8'));
  const items = snapshot.entries;

  try {
    await fs.mkdir(path.join(restoredPath))
  } catch (e) {
    throw new Error('FS operation failed');
  }

  for(const item of items) {
    if(item.type === 'file') {
      await fs.writeFile(path.join(restoredPath, item.path), item.content, {encoding: 'base64'})
    }

    if(item.type === 'directory') {
      await fs.mkdir(path.join(restoredPath, item.path))
    }
  }

};

await restore();
