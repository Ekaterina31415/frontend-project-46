import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatSelection = (format) => {
  if (format === 'plain' || format === 'p') {
    return plain;
  }
  if (format === 'json') {
    return json;
  }
  return stylish;
};
export default formatSelection;
