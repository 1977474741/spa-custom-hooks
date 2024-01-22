import { getStore, getVal } from './utils.js';
const vue = {
    mixin(mixin) {
        let app = App,
            page = Page,
            component = Component;
        // 通过重写构造器实现mixin的生命周期部分
        App = (options) => {
            this.mergeHook(mixin, options);
            app(options);
        };
        Page = (options) => {
            this.mergeHook(mixin, options);
            page(options);
        };
        Component = (options) => {
            this.mergeComponentHook(mixin, options, options);
            component(options);
        };
    },
    // mixin实现
    mergeHook(mixin, options) {
        for (let [key, value] of Object.entries(mixin)) {
            const originFunc = options[key];
            options[key] = function (...args) {
                originFunc && originFunc.call(this, ...args);
                value.call(this, ...args);
            };
        }
    },
    //由于小程序组件钩子的特殊性，this上没有挂钩子引用，所以需要特殊处理
    mergeComponentHook(mixin, options, optionProperties) {
        if (!options) return;
        const lifetimesKeys = ['lifetimes', 'pageLifetimes'];
        for (let [key, value] of Object.entries(mixin)) {
            if (lifetimesKeys.includes(key)) {
                this.mergeComponentHook(mixin[key], options[key], options);
            } else {
                const originFunc = options[key];
                options[key] = function (...args) {
                    originFunc && originFunc.call(this, ...args);
                    value.call(this, optionProperties, ...args);
                };
            }
        }
    },
    userAgentKey: 'miniprogram',
};
const subscribers = {};
const store = {
    // 基于es5实现，不支持监听没有定义的属性
    watch(keyFun, cb, options) {
        // 获取数据仓库，一般为globalData对象
        const baseState = getStore().state;
        // 具体要监听的属性
        const watchKey = options.watchKey;
        const base = getVal(baseState, watchKey, true);
        let subscriber = {
            callback: cb,
            // 是否是卸载监听
            unwatch: false,
        };
        if (subscribers[watchKey]) {
            subscribers[watchKey].push(subscriber);
        } else {
            subscribers[watchKey] = [subscriber];
        }
        const unMonitorArrayFn = [];
        deep(base.obj, base.key);
        function deep(obj, key) {
            // 监听基本数据类型
            let name = obj[key];
            Object.defineProperty(obj, key, {
                configurable: true,
                enumerable: true,
                set: function (v) {
                    name = v;
                    subscribers[watchKey].map((subscriber) => subscriber.callback(base.obj[base.key]));
                },
                get: function () {
                    return name;
                },
            });
            // 额外添加对数组长度的监听
            if (Array.isArray(obj[key])) {
                // 监听数组长度
                unMonitorArrayFn.push(
                    monitorArray(obj[key], () => {
                        cb(base.obj[base.key]);
                    })
                );
            }
            // 递归监听引用数据类型
            if (typeof obj[key] === 'object' && obj[key] != null) {
                for (let [key_, value_] of Object.entries(obj[key])) {
                    deep(obj[key], key_);
                }
            }
        }
        return () => {
            // 取消基本数据类型监听
            subscriber.unwatch = true;
            const unwatchIndex = subscribers[watchKey].findIndex((e) => e.unwatch);
            subscribers[watchKey].splice(unwatchIndex, 1);
            if (!subscribers[watchKey].length) {
                delete subscribers[watchKey];
            }
            // 取消数组长度监听
            unMonitorArrayFn.map((f) => f());
        };
    },
};

// 监听数组长度
function monitorArray(array, callback) {
    // 获取Array原型
    const arrayMethods = Object.create(array);
    const unwatchFn = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].map((method) => {
        // 原生Array的原型方法
        let original = arrayMethods[method];
        define(array, method, function () {
            original.apply(this, arguments);
            // 调用对应的原生方法并返回结果（新数组长度）
            return callback.apply(this, arguments);
        });
        return () => {
            define(array, method, original);
        };
    });
    return () => {
        unwatchFn.map((f) => f());
    };
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
