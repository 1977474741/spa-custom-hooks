import hookEntity from './hook-entity.js'
import { BASE } from './init.js'
// 注册的自定义钩子
let diyHooks = {
    
}

// 所有支持的原生钩子
const nativeHooks = ['created','beforeMount','mounted','activated','deactivated','beforeDestroy','destroyed','onLoad','attached','detached', 'onShow','onHide','onReady','onUnload']

/**
 * 输入hooks配置项，所有hook经过hookEntity处理，输出hookEntity对象列表
 * @param customhook {Object customhook} hookEntity类有用到
 * return Hooks {Object Hooks} 所有注册的hook对应的hookEntity对象列表
 */
const Hooks = (customhook) => ({
    'Launch': new hookEntity({
        customhook,
        name:'onLaunch',
        destroy: 'onUnload',
        hit: true
    }),
    'Created': new hookEntity({
        customhook,
        name:'created',
        destroy: 'destroyed',
        hit: BASE.initHook == 'created'
    }),
    'Load': new hookEntity({
        customhook,
        name:'onLoad',
        destroy: 'onUnload',
        hit: BASE.initHook == 'onLoad'
    }),
    'Attached': new hookEntity({
        customhook,
        name:'attached',
        destroy: 'detached',
    }),
    'Show': new hookEntity({
        customhook,
        name:'onShow',
        destroy: 'onHide',
    }),
    'Mounted': new hookEntity({
        customhook,
        name:'mounted',
        destroy: 'destroyed',
    }),
    'Ready': new hookEntity({
        customhook,
        name:'onReady',
        destroy: 'onUnload'
    }),
    ...(Object.keys(diyHooks).reduce((hooks,key)=>{
        const item = diyHooks[key]
        item.customhook = customhook
        return (hooks[key] = new hookEntity(item)) && hooks
    },{}))
})

const init = (hooks)=> diyHooks = hooks

/**
 * 获取所有自定义钩子
 * return diyHooks {Array string} diy钩子数组
 */
const getDiyHooks = ()=> Object.keys(diyHooks)

/**
 * 手动命中某属性钩子-待开发
 * @param name {String} 单个钩子名
 * @param state {String} 要改变的状态
 */
const setHit = (name,state)=> {
    Hooks()[name][state?'cycleStart':'cycleEnd']()
}

/**
 * 使用js监听属性钩子-待开发
 * @param name {String} 钩子名、这里只允许属性监听钩子
 * @param cb {Function} 回调函数
 */
const on = (name,cb)=> {
    
}

export {
    Hooks,
    getDiyHooks,
    nativeHooks,
    init,
    setHit,
    on,
}