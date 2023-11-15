import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatSelection = (format) => {
  switch (format) {
    case 'plain' || 'p':
      return plain;

    case 'json':
      return json;

    default:
      return stylish;
  }
};
export default formatSelection;
