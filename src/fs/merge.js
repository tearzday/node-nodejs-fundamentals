import fs from 'fs/promises';
import path from 'path';


const merge = async () => {
  // Write your code here
  // Default: read all .txt files from workspace/parts in alphabetical order
  // Optional: support --files filename1,filename2,... to merge specific files in provided order
  // Concatenate content and write to workspace/merged.txt

  const rootPath = path.resolve('workspace/parts');

  const files = process.argv.slice(2)[0];
  const ext = '.txt'

  let items;
  const content = []

  const saveFileContent = async (fileName) => {
    try {
      const text = await fs.readFile(path.join(rootPath, fileName))
      content.push(text)
    } catch(e) {
      throw new Error('FS operation failed');
    }
  }

  try {
    items = (await fs.readdir(rootPath, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))
  } catch (e) {
    throw new Error('FS operation failed');
  }

  if(files) {
    const fileNames = files.split(',')
    for (const fileName of fileNames) {
      if (items.some((item) => item.name === fileName)) {
        await saveFileContent(fileName);
      } else {
        throw new Error('FS operation failed');
      }
    }
  } else {
    for(const item of items) {      
        if(path.extname(item.name) === ext) {
            await saveFileContent(item.name)
      }
    }
  }

  if (!files && content.length === 0) {
    throw new Error('FS operation failed');
  }

  const strContent = content.join('\n')
  await fs.writeFile(path.join('workspace/merged.txt'), strContent)
};

await merge();
