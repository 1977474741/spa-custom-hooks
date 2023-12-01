import { Hooks, nativeHooks, getDiyHooks } from './hooks.js';
import { getVal, getStore } from './utils.js';

/**
 * @Author      鹅鹅鹅
 * @DateTime    2023-12-01
 * @description 自定义钩子
 */
export default class customHook {
    constructor({ instance, options, pageHooks, instanceType, initHookName }) {
        // 页面实例、原生钩子对象
        this.instance = instance;
        // 实例类型 app,page,component
        this.instanceType = instanceType;
        // 进行实例化的钩子名称
        this.initHookName = initHookName;
        // 是否是组件
        this.isComponent = instanceType === 'component';
        // 页面内需要处理的所有钩子构成和函数执行状态
        this.customHooks = {};
        // 页面内需要处理的所有钩子数组
        this.customHookArr = [];
        // 所有钩子对象，注册的所有钩子的hookEntity类集合
        this.hook = {};
        // url里的参数
        this.options = options || {};
        // 钩子对象
        this.pageHooks = pageHooks;
        // 自定义的属性监听钩子
        this.diyHooks = getDiyHooks();
        this.init();
        //检测是否有需要立即触发的钩子
        this.triggerHook();
    }
    init() {
        // 提出需要注入的自定义钩子
        let hook = Hooks(this, this.initHookName);
        // 当前实例支持的所有钩子
        this.presetHooksName = Object.keys(hook);
        this.hook = hook;
        let pageHooks = this.pageHooks;
        // 钩子对象在自身还是原型链
        let oneself = pageHooks.hasOwnProperty('beforeCreate') || pageHooks.hasOwnProperty('onReady');
        pageHooks = oneself ? pageHooks : pageHooks['__proto__'];
        if (this.isComponent) {
            // 把lifetimes和pageLifetimes合并过来一起处理
            Object.assign(pageHooks, pageHooks.lifetimes, pageHooks.pageLifetimes);
        }
        // 过滤钩子对象、分析钩子构成
        let { customHookArr, hookInscape } = this.filterHooks(pageHooks);
        // 单独处理每个钩子
        customHookArr.forEach((e) => {
            this.customHooks[e] = {
                // 此钩子实体函数
                callback: pageHooks[e].bind(this.instance),
                // 此钩子构成
                inscape: hookInscape[e],
                // 此钩子是否已执行
                execute: false,
                // 决定执行顺序的累加权重值，小的在前先执行
                weightValue: hookInscape[e].reduce((total, hookKey) => {
                    return (total += this.hook[hookKey]?.weightValue || 0);
                }, 0),
            };
        });
        // 按weightValue进行排序
        this.customHookArr = customHookArr.sort((a, b) => {
            return this.customHooks[a].weightValue - this.customHooks[b].weightValue;
        });
        // await Promise.resolve();
        Object.keys(this.hook).forEach((e) => this.hook[e].init());
    }
    /**
     * 过滤出钩子对象
     * @params  Object<key,function> 页面所有钩子对象列表
     * return  {
     *     customHookArr Array<string> 自定义钩子数组
     *     hookInscape Object<key,Array<string>> 自定义钩子构成
     * }
     */
    filterHooks(option) {
        // 各钩子和包含的所有已注册单独钩子构成
        let hookInscape = {};
        // 筛选出来用到的hook实例
        const filterHook = {};
        const customHookArr = Object.keys(option).filter((e) => {
            // 不符合规则的钩子不予处理
            let hookArr = this.getHookArr(e);
            if (hookArr.length) {
                //过滤掉未注册的钩子
                hookInscape[e] = hookArr.filter((h) => {
                    if (this.hook[h]) {
                        filterHook[h] = this.hook[h];
                        return true;
                    }
                    console.warn(
                        `[custom-hook 错误声明警告] "${h}"钩子未注册，意味着"${e}"可能永远不会执行，请先注册此钩子再使用，文档：https://github.com/1977474741/spa-custom-hooks#-diyhooks对象说明`
                    );
                    return false;
                });
                //格式 + 是否注册的效验
                return e == 'on' + hookArr.join('') && hookInscape[e].length == hookArr.length;
            }
            return false;
        });
        // 只保留用到的hook实例
        this.hook = filterHook;
        return {
            customHookArr,
            hookInscape,
        };
    }
    /**
     * 检测是否有需要触发的钩子
     * @params <string> 本次变化的钩子key
     */
    triggerHook(hitKey) {
        this.customHookArr.forEach((name) => {
            let customHook = this.customHooks[name];
            let meet = customHook.inscape.every((e) => this.hook[e] && this.checkHookHit(this.hook[e]));
            if (meet && !customHook.execute) {
                customHook.execute = true;
                this.customHooks[name]['callback'](this.options);
            }
        });
    }
    /**
     * 清除关于本次destroy钩子的所有包含此钩子的执行状态
     * @params <string> 要清除的钩子名称
     */
    resetExecute(destroyHookName) {
        this.customHookArr.forEach((pageHookName) => {
            let customHook = this.customHooks[pageHookName];
            if (customHook.inscape.find((hookName) => destroyHookName === this.hook[hookName]?.destroy)) {
                customHook.execute = false;
            }
        });
    }
    /**
     * 检验此钩子是否满足命中条件
     * @param hookEntity实例
     * return <boolean> 是否满足
     */
    checkHookHit(hookEntity) {
        if (hookEntity.watchKey) {
            //注意：instance对象必须从传进来的实体里拿，不能this.instance
            let val = getVal(getStore(hookEntity.__customhook.instance).state, hookEntity.watchKey);
            return hookEntity.onUpdate ? hookEntity.onUpdate(val) : val;
        } else {
            return hookEntity.hit;
        }
    }
    /**
     * 获取组合钩子包含的所有钩子（包含多于一个钩子 || 单个自定义属性钩子）、是的话返回钩子构成
     * @param <string> 钩子名称
     * return Array<string> 钩子构成
     */
    getHookArr(name) {
        if (name.indexOf('on') == -1) return [];
        const hookArr = this.splitHook(name),
            diyHooks = this.diyHooks;
        return hookArr.length > 1 || diyHooks.indexOf(hookArr[0]) != -1 ? hookArr : [];
    }
    /**
     * 分析组合钩子构成
     * @param <string> 组合钩子名称
     * return Array<string> 钩子构成数组
     */
    splitHook(name) {
        name = name.replace('on', '');
        // 将钩子数组按照长度进行降序排序，以确保匹配最长的字符串优先
        this.presetHooksName.sort((a, b) => b.length - a.length);
        // 使用正则表达式将钩子数组中的每个元素都转换为对应的捕获组，然后通过join函数连接起来
        let regex = new RegExp('(' + this.presetHooksName.join('|') + ')', 'g');
        // 使用split函数根据正则表达式对组合钩子进行分割并过滤掉无效的部分
        return name.split(regex).filter((e) => this.hook[e]);
    }
}
