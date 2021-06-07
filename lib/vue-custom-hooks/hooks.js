/**
 * @Author      鹅鹅鹅
 * @description 输入hooks配置项，所有hook经过hookEntity处理，输出hooks对象
 * @param ↓
 * customhook: hookEntity对象有用到
 */
import hookEntity from './hook-entity.js';
import { BASE } from './init.js';
let diyHooks = {
    
};
const nativeHooks = ['created','beforeMount','mounted','activated','deactivated','beforeDestroy','destroyed','onLoad','attached','detached', 'onShow','onHide','onReady','onUnload'];
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
        hit: true
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
        const item = diyHooks[key];
        item.customhook = customhook;
        return (hooks[key] = new hookEntity(item)) && hooks;
    },{}))
});

const init = (hooks)=> diyHooks = hooks

const getDiyHooks = ()=> Object.keys(diyHooks)

// 手动命中某属性钩子-待开发
const setHit = (name,state)=> {
    Hooks()[name][state?'cycleStart':'cycleEnd']();
}

export {
    Hooks,
    getDiyHooks,
    nativeHooks,
    setHit,
    init
}