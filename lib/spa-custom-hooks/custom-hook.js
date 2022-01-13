import { Hooks,getDiyHooks,nativeHooks } from './hooks.js';
import { getVal,getStore } from './utils.js';
//所有原生钩子数组
let nativeHooksName = nativeHooks.map(e=>toHookName(e));
/**
 * @Author      鹅鹅鹅
 * @DateTime    2020-06-24T19:24:40+0800
 * @description 自定义钩子
 * @param page {Object component} 当前组件实例
 * @param options {Object object} 当前组件接收到的参数
 * @param pageHooks {Object object} 当前组件钩子对象
 * return customHook {Object customHook} 
 */
export default class customHook {
    constructor(page,options,pageHooks) {
        // 页面实例、原生钩子对象
        this.pageInstance = page;
        // 页面内需要处理的所有钩子构成和函数执行状态
        this.customHooks = {};
        // 页面内需要处理的所有钩子数组
        this.customHookArr = [];
        // 所有钩子对象，注册的所有钩子的hookEntity类集合
        this.hook = {};
        // url里的参数
        this.options = options;
        // 钩子对象
        this.pageHooks = pageHooks;
        // page的hooks对象
        this.init();
    }
    init() {
        // 提出需要注入的自定义钩子
        let hook = Hooks(this);
        this.hook = hook;
        let pageHooks = this.pageHooks;
        // 钩子对象在自身还是原型链
        let oneself = pageHooks.hasOwnProperty('beforeCreate') || pageHooks.hasOwnProperty('onReady');
        // 过滤钩子对象、分析钩子构成
        let {customHookArr,hookInscape} = this.filterHooks(oneself ? pageHooks : pageHooks['__proto__']);
        this.customHookArr = customHookArr;
        // 单独处理每个钩子
        customHookArr.forEach((e) => {
            this.customHooks[e] = {
                // 此钩子实体函数
                callback: pageHooks[e].bind(this.pageInstance),
                // 此钩子构成
                inscape: hookInscape[e],
                // 此钩子是否已执行
                execute: false
            };
            //启用需要的钩子
            hookInscape[e].forEach(hookStr => hook[hookStr].need = true);
        });
        // await Promise.resolve();
        customHookArr.length && Object.keys(hook).forEach(e => hook[e].need && hook[e].init());
    }
    /**
     * 过滤出钩子对象
     * @params  option {Object {Function function} || {Array function}} 页面所有钩子列表
     * return  {
     *     customHookArr {Array string} 自定义钩子数组
     *     hookInscape {Object array} 自定义钩子构成
     * }
     */
    filterHooks(option){
        // 各钩子和包含的所有已注册单独钩子构成
        let hookInscape = {};
        // 筛选出自定义钩子
        return {
            customHookArr: Object.keys(option).filter(e => {
                // 不符合规则的钩子不予处理
                let hookArr = this.getHookArr(e);
                if(hookArr.length){
                    //过滤掉未注册的钩子
                    hookInscape[e] = hookArr.filter((h)=>{
                        if(this.hook[h]){
                            return true;
                        }
                        console.warn(`[custom-hook 错误声明警告] "${h}"钩子未注册，意味着"${e}"可能永远不会执行，请先注册此钩子再使用，文档：https://github.com/1977474741/spa-custom-hooks#-diyhooks对象说明`);
                        return false;
                    });
                    //格式 + 是否注册的效验
                    return e == 'on' + hookArr.join('') && hookInscape[e].length == hookArr.length;
                }
                return false;
            }),
            hookInscape
        }
    }
    /**
     * 检测是否有需要触发的钩子
     * @params  hitKey {String} 本次变化的钩子key
     */
    triggerHook(hitKey) {
        this.customHookArr.forEach((name) => {
            let customHook = this.customHooks[name];
            let meet = customHook.inscape.every(e => this.hook[e].need && this.checkHookHit(this.hook[e]))
            if (meet && !customHook.execute) {
                this.customHooks[name]['callback'](this.options);
                customHook.execute = true;
            }
        });
    }
    /**
     * 清除关于本次更新钩子的所有钩子的执行状态
     * @params  name {String} 要清除的钩子名称
     */
    resetExecute(name) {
        name = toHookName(name);
        this.customHookArr.forEach((pageHookName) => {
            let customHook = this.customHooks[pageHookName];
            if (customHook.inscape.indexOf(name) != -1) {
                customHook.execute = false;
            }
        })
    }
    /**
     * 分析钩子构成
     * @param name {String} 钩子名称
     * return hookArr {Array string} 钩子构成数组
     */
    splitHook(name){
        name = name.replace('on', '').split(/(?=[A-Z])/);
        const hooksAll = [...new Set(nativeHooksName.concat(getDiyHooks()))].sort((a,b)=>b.length - a.length);
        const hookArr = [];
        let hookName = '';
        for (var i = 0; i < name.length; i++) {
            const str = name[i];
            hookName += str;
            if(hooksAll.indexOf(hookName) != -1){
                hookArr.push(hookName);
                hookName = '';
            }
        }
        return hookArr;
    }
    /**
     * 检验此钩子是否满足条件
     * @param hookEntity {Object hookEntity} hookEntity实例
     * return {Boolean} 是否满足
     */
    checkHookHit(hookEntity){
        if(hookEntity.watchKey){
            //注意：pageInstance对象必须从传进来的实体里拿，不能this.pageInstance
            let val = getVal(getStore(hookEntity.__customhook.pageInstance).state,hookEntity.watchKey);
            return (hookEntity.onUpdate ? hookEntity.onUpdate(val) : val);
        }else{
            return hookEntity.hit;
        }
    }
    /**
     * 判断是否为有效钩子、是的话返回钩子构成
     * @param name {String} 钩子名称
     * return hookArr {Array string} 钩子构成
     */
    getHookArr(name){
        if(name.indexOf("on") == -1) return [];
        const hookArr = this.splitHook(name),
                diyHooks = getDiyHooks();
        //组合钩子或者单个自定义钩子都视为有效钩子
        return hookArr.length > 1 || diyHooks.indexOf(hookArr[0]) != -1 ? hookArr : [];
    }
}
/**
 * 转换为内部使用的钩子key
 * @param name {String} 钩子名
 * return name {String} 转换后的钩子key
 */
function toHookName(name){
    name = name.replace('on', '');
    name = name.substring(0,1).toUpperCase() + name.substring(1);
    return name;
}