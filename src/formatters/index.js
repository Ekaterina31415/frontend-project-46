import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getOutputFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);

    case 'plain' || 'p':
      return plain(data);

    case 'json':
      return json(data);

    default:
      throw new Error(`Invalid format: ${format}`);
  }
};
export default getOutputFormat;
