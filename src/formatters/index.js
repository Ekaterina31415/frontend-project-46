import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getOutputFormat = (data, format) => {
  switch (format) {
    case 'plain' || 'p':
      return plain(data);

    case 'json':
      return json(data);

    default:
      return stylish(data);
  }
};
export default getOutputFormat;
