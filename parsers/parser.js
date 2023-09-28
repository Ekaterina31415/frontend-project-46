import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (file) => {
  const fileExt = path.extname(file);
  const resolveFilePath = (filePath) => (path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath));
  const fileContent = fs.readFileSync(resolveFilePath(file), 'utf8');

  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);

    case '.yaml':
      return yaml.load(fileContent);

    case '.yml':
      return yaml.load(fileContent);

    default:
      console.log('Only .json or .yaml(.yml) file are supported');
      return {};
  }
};

export default parse;
