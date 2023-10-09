import plain from './plain.js';
import stylish from './stylish.js';

const formatSelection = (format) => {
  if (format === 'plain' || format === 'p') {
    return plain;
  }
  return stylish;
};
export default formatSelection;
