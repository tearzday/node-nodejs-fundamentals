import fs from 'fs/promises';
import path from 'path';

const snapshot = async () => {
  // Write your code here
  // Recursively scan workspace directory
  // Write snapshot.json with:
  // - rootPath: absolute path to workspace
  // - entries: flat array of relative paths and metadata

//   {
//   "rootPath": "/home/user/workspace",
//   "entries": [
//     { "path": "file1.txt", "type": "file", "size": 1024, "content": "file contents as base64 string" },
//     { "path": "subdir", "type": "directory" },
//     { "path": "subdir/nested.txt", "type": "file", "size": 512, "content": "nested file contents as base64 string" }
//   ]
// }
  const rootPath = path.resolve('workspace');
  const entries = [];

  const scanDirectory = async (dirPath) => {
    const files = await fs.readdir(dirPath, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(dirPath, file.name);
        const relativePath = path.relative(rootPath, filePath);
        
      if (file.isFile()) {
        const fileStat = await fs.stat(filePath);
        const fileContent = await fs.readFile(filePath, 'utf-8');

        entries.push({
          "path": relativePath,
          "type": "file",
          "size": fileStat.size,
          "content": fileContent
        });
      }

      if (file.isDirectory()) {
        entries.push({
          "path": relativePath,
          "type": "directory",
        });

        await scanDirectory(filePath);
      }
    }
  }

  await scanDirectory(rootPath);

  const snapshot = {
    "rootPath": rootPath,
    "entries": entries
  };

  await fs.writeFile('snapshot.json', JSON.stringify(snapshot, null, 2));
};

await snapshot();
