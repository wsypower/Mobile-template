/*
 * @description 自动导入Svg
 * @Author: wei.yafei
 * @Date: 2019-11-06 20:48:13
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-11-06 21:18:56
 */

/**
 * 自动收集svg下所有的文件
 */
interface RequireContext<T> {
  (requireContext: T): Array<any>;
}

const req = require.context('@/assets/svg', false, /\.svg$/);
const requireAllSvg: RequireContext<any> = requireContext =>
  requireContext.keys().map(requireContext);
requireAllSvg(req);
