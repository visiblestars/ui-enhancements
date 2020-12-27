import {labels} from '../../shared/localization/labels';

export default (tag) => {
  let dir = sessionStorage.getItem('dir');
  let label = labels.get(tag);
  let result = dir === 'rtl' ? label.ar : label.en;
  return result;
};
