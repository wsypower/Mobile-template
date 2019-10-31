import Vue from 'vue';

import { TyPluginComponent } from './component';

/**
 * 需通过 `Vue.use(Cube)` 来安装
 * Call `Vue.use(Cube)` to install
 *
 * @date 2019-10-31
 * @param {typeof Vue} vue
 * @param {object} [options]
 *
 */
export function install(vue: typeof Vue, options?: object): void;

export class iosNoBounce extends TyPluginComponent {}
