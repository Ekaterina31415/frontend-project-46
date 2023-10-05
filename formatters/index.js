import plain from './plain.js';
import nested from './stylish.js';

const formatSelection = (format) => {
  if (format === 'plain' || format === 'p') {
    return plain;
  }
  return nested;
};
export default formatSelection;
