import fs from 'fs/promises';
import path from 'path';

const findByExt = async () => {
  // Write your code here
  // Recursively find all files with specific extension
  // Parse --ext CLI argument (default: .txt)
  const rootPath = path.resolve('workspace')
  const ext = process.argv.slice(2)[1] || '.txt';
  const result = [];

  const scanDirectory = async (dirPath) => {
    let items

    try {
      items = await fs.readdir(dirPath, { withFileTypes: true })
    } catch (e) {
      throw new Error('FS operation failed');
    }


    for(const item of items) {
      if (item.isFile()) {
        if(path.extname(item.name) === `.${ext}`) {
          result.push(path.join(rootPath, item.name))
        }
      } else if(item.isDirectory()) {
        const newPath = path.join(dirPath, item.name)
        await scanDirectory(newPath)
      }
    }
  }

  await scanDirectory(rootPath)

  console.log(result.sort().join('\n'));
};


await findByExt();
