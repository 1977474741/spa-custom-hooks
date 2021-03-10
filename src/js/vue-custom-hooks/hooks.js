import hookEntity from './hook-entity.js';
let diyHooks = {
   
};
const nativeHooks = ['onLoad', 'onShow','onHide','onReady','onUnload','created','beforeMount','mounted','beforeDestroy','destroyed'];
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
        destroy: 'onUnload'
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

export {
    Hooks,
    getDiyHooks,
    nativeHooks,
    init
}