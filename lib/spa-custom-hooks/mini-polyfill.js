import { getStore, getVal } from './utils.js';
const vue = {
    mixin(mixin) {
        let page = Page,
            app = App;
        // 通过重写page实现mixin的生命周期部分
        Page = (options) => {
            this.mergeHook(mixin, options);
            page(options);
        };
        App = (options) => {
            this.mergeHook(mixin, options);
            app(options);
        };
    },
    // mixin实现
    mergeHook(mixin, options) {
        for (let [key, value] of Object.entries(mixin)) {
            const originFunc = options[key];
            options[key] = function (...args) {
                value.call(this, ...args);
                return originFunc && originFunc.call(this, ...args);
            };
        }
    },
    userAgentKey: 'miniprogram',
};
const callbacks = {};
const store = {
    // 基于es5实现，不支持监听没有定义的属性
    watch(keyFun, cb, options) {
        // 获取数据仓库，一般为globalData对象
        const baseState = getStore().state;
        // 具体要监听的属性
        const watchKey = options.watchKey;
        const base = getVal(baseState, watchKey, true);
        if (callbacks[watchKey]) {
            callbacks[watchKey].push(cb);
        } else {
            callbacks[watchKey] = [cb];
        }
        deep(base.obj, base.key);
        function deep(obj, key) {
            // 监听基本数据类型
            let name = obj[key];
            Object.defineProperty(obj, key, {
                configurable: true,
                enumerable: true,
                set: function (v) {
                    name = v;
                    callbacks[watchKey].map((e) => e(base.obj[base.key]));
                },
                get: function () {
                    return name;
                },
            });
            // 额外添加对数组长度的监听
            if (Array.isArray(obj[key])) {
                // 监听数组长度
                monitorArray(obj[key], () => {
                    cb(base.obj[base.key]);
                });
            }
            // 递归监听引用数据类型
            if (typeof obj[key] === 'object' && obj[key] != null) {
                for (let [key_, value_] of Object.entries(obj[key])) {
                    deep(obj[key], key_);
                }
            }
        }
    },
};

// 监听数组长度
function monitorArray(array, callback) {
    // 获取Array原型
    const arrayMethods = Object.create(array);
    ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach((method) => {
        // 原生Array的原型方法
        let original = arrayMethods[method];
        define(array, method, function () {
            original.apply(this, arguments);
            // 调用对应的原生方法并返回结果（新数组长度）
            return callback.apply(this, arguments);
        });
    });
}

// 定义不可枚举的属性
function define(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
}

export { vue, store };
