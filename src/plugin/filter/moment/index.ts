/*
 * @Author: wei.yafei
 * @Date: 2019-11-19 18:29:28
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-19 19:57:32
 */
import filters from './filters';
import vue from 'Vue';

const vueFiltersDate = {
  install(Vue: typeof vue, options?: object) {
    Object.keys(filters).forEach(name => {
      Vue.filter(name, filters[name]);
    });
  },
};

export default vueFiltersDate;
