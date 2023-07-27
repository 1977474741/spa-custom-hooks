import * as init from './init.js';
import { setHit } from './hooks.js';
import * as polyfill from './mini-polyfill.js';
const install = function () {
    if (arguments.length < 3) {
        // 小程序架构，使用垫片
        init.install(polyfill.vue, arguments[0], polyfill.store, arguments[1] || 'globalData');
    } else {
        // vue架构
        init.install(...arguments);
    }
};
export default {
    install,
    setHit,
};
