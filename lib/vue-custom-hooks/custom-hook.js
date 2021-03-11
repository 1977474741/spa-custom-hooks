/**
 * @Author      鹅鹅鹅
 * @DateTime    2020-06-24T19:24:40+0800
 * @description 自定义钩子
 * @param       {page：页面实例} 
 */
import { Hooks,getDiyHooks,nativeHooks } from './hooks.js';
let nativeHooksName = nativeHooks.map(e=>toHookName(e));
import hookEntity from './hook-entity.js';
export default class customHook {
    constructor(page,options,pageHooks,pageNativeHooks,isNativeHookCache = false) {
        // 页面实例、原生钩子对象
        this.pageInstance = page;
        // 页面内需要处理的所有钩子函数
        this.hookFun = {};
        // 页面内需要处理的所有钩子函数名
        this.hooksStr = [];
        // 所有钩子对象，Hook的实例
        this.hook = {};
        // url里的参数
        this.options = options;
        // 钩子对象
        this.pageHooks = pageHooks;
        // 原生钩子对象
        this.pageNativeHooks = pageNativeHooks;
        // 是否有原生钩子缓存
        this.isNativeHookCache = isNativeHookCache;
        // 各监听事件的销毁函数
        this.unWatchs = [];
        // page的hooks对象
        this.init();
    }
    async init() {
        // 提出需要注入的自定义钩子
        let hook = Hooks(this);
        this.hook = hook;
        // 临时缓存各钩子的组合
        let hookInscape = {};
        Object.keys(this.pageHooks).filter(e => {
            let contain = getDiyHooks().some(s => e.indexOf(s) != -1 && nativeHooks.indexOf('on' + s) == -1);
            if(contain){
                hookInscape[e] = this.splitHook(e);
                return e == 'on'+hookInscape[e].join('') && hookInscape[e].every(h => hook[h]);
            }
            return false;
        }).forEach((e, index) => {
            this.hooksStr[index] = {
                name: [],
                execute: false
            };
            this.hookFun[e] = this.pageHooks[e];
            hookInscape[e].forEach(hookStr => {
                if (hook[hookStr] && hook[hookStr].init) {
                    this.hooksStr[index].name.push(hookStr);
                    if(hook[hookStr].destroy && hook[hookStr].name){
                        // 不支持的钩子不予处理
                        let pageHooks = this.pageHooks;
                        if(pageHooks[hook[hookStr].name].length && pageHooks[hook[hookStr].destroy].length){
                            hook[hookStr].need = true;
                        };
                    }else{
                        hook[hookStr].need = true;
                    }
                }
            })
        });
        // await Promise.resolve();
        Object.keys(hook).forEach(e => hook[e].need && hook[e].init());
    }
    /**
     * 检测是否有需要触发的钩子
     * @params      hitKey，本次变化的钩子key
     */
    triggerHook(hitKey) {
        let that = this;
        this.hooksStr.forEach((hookStr) => {
            let meet = hookStr.name.every(e => this.hook[e].need && this.checkHookHit(this.hook[e]))
            // console.log(that);
            if (meet && !hookStr.execute) {
                this.hookFun['on' + hookStr.name.join('')].call(this.pageInstance,this.options);
                hookStr.execute = true;
            }
        });
    }
    /**
     * 清除关于本次更新钩子的所有钩子的执行状态
     * @param    要清除的钩子名称
     */
    resetExecute(name) {
        name = toHookName(name);
        this.hooksStr.forEach((hookStr) => {
            if (hookStr.name.indexOf(name) != -1) {
                hookStr.execute = false;
            }
        })
    }
    /**
     * 分析钩子构成
     * @param    钩子名称
     * return    钩子构成数组
     */
    splitHook(name){
        name = name.replace('on', '').split(/(?=[A-Z])/);
        const hooksAll = [...new Set(nativeHooksName.concat(getDiyHooks()))].sort((a,b)=>b.length - a.length);
        const hooksName = [];
        let hookName = '';
        for (var i = 0; i < name.length; i++) {
            const str = name[i];
            hookName += str;
            if(hooksAll.indexOf(hookName) != -1){
                hooksName.push(hookName);
                hookName = '';
            }
        }
        return hooksName;
    }
    /**
     * 检验此钩子是否满足条件
     * @param    hookEntity实例
     * return    是否满足
     */
    checkHookHit(hookEntity){
        if(hookEntity.watchKey){
            let val = getVal(hookEntity.__customhook.pageInstance,hookEntity.watchKey);
            return (hookEntity.onUpdate ? hookEntity.onUpdate(val) : val);
        }else{
            return hookEntity.hit;
        }
    }
}
/**
 * 转换为内部使用的钩子key
 * @param    钩子全名
 * return    钩子key
 */
function toHookName(name){
    name = name.replace('on', '');
    name = name.substring(0,1).toUpperCase() + name.substring(1);
    return name;
}
function getVal(obj,keyStr){
    return keyStr.split('.').reduce((obj,val) => obj[val],obj);
}
