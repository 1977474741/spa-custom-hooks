import hookEntity from './hook-entity.js';
// 注册的自定义钩子
let diyHooks = {};

// 需要mixin的原生钩子
const nativeHooks = [
  // vue
  'beforeCreate',
  'created',
  'onPageShow',
  'beforeMount',
  'mounted',
  'activated',
  'onPageHide',
  'deactivated',
  'beforeDestroy',
  'destroyed',
  // app和page
  'onLaunch',
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
];
// 原生组件钩子
const componentHooks = ['onInit', 'created', 'attached', 'ready', 'didMount', 'detached', 'didUnmount'];
const lifetimesHooks = ['created', 'attached', 'ready', 'detached'];
const pageLifetimesHooks = ['show', 'hide', 'routeDone'];
// 原生所有钩子
const nativeAllHooks = [...new Set([...nativeHooks, ...componentHooks])];
/**
 * 输入hooks配置项，所有hook经过hookEntity处理，输出hookEntity对象列表
 * @param1 <customhook>实例化对象
 * @param2 <string> 初始化的钩子名
 * return Object<key,hookEntity> 所有注册的hook对应的hookEntity对象列表
 */
const Hooks = (customhook, initHookName) =>
  Object.keys(diyHooks).reduce(
    (hooks, key) => {
      const diyHook = diyHooks[key];
      diyHook.customhook = customhook;
      return (hooks[key] = new hookEntity(diyHook)) && hooks;
    },
    {
      // vue钩子
      BeforeCreate: new hookEntity({
        customhook,
        name: 'BeforeCreate',
        destroy: 'destroyed',
        hit: true,
        weightValue: 2,
      }),
      BeforeMount: new hookEntity({
        customhook,
        name: 'beforeMount',
        destroy: 'destroyed',
        weightValue: 4,
      }),
      PageShow: new hookEntity({
        customhook,
        name: 'onPageShow',
        destroy: 'onPageHide',
        weightValue: 4.1,
      }),
      Mounted: new hookEntity({
        customhook,
        name: 'mounted',
        destroy: 'destroyed',
        weightValue: 5,
      }),
      Activated: new hookEntity({
        customhook,
        name: 'activated',
        destroy: 'deactivated',
        weightValue: 6,
      }),
      PageHide: new hookEntity({
        customhook,
        name: 'onPageHide',
        destroy: 'onPageShow',
        weightValue: 6.1,
      }),
      Deactivated: new hookEntity({
        customhook,
        name: 'deactivated',
        destroy: 'activated',
        weightValue: 7,
      }),
      // 兼容页面的钩子和组件的钩子名相似的情况，比如各种小程序的页面是onShow，组件却是show，但他们的key在这里都是Show，为了防止key冲突，故而加判断分开注册，保证key的唯一性，也统一了页面和组件钩子的声明方式
      ...(!customhook.isComponent
        ? {
          Launch: new hookEntity({
            customhook,
            name: 'onLaunch',
            destroy: 'onUnload',
            hit: true,
            weightValue: 3,
          }),
          Created: new hookEntity({
            customhook,
            name: 'created',
            destroy: 'destroyed',
            hit: initHookName === 'created',
            weightValue: 3,
          }),
          Load: new hookEntity({
            customhook,
            name: 'onLoad',
            destroy: 'onUnload',
            hit: initHookName === 'onLoad',
            weightValue: 4,
          }),
          Ready: new hookEntity({
            customhook,
            name: 'onReady',
            destroy: 'onUnload',
            weightValue: 5,
          }),
          Show: new hookEntity({
            customhook,
            name: 'onShow',
            destroy: 'onHide',
            weightValue: 6,
          }),
          Hide: new hookEntity({
            customhook,
            name: 'onHide',
            destroy: 'onShow',
            weightValue: 7,
          }),
        }
        : {
          // 原生小程序组件 包含的钩子
          Init: new hookEntity({
            customhook,
            name: 'onInit',
            destroy: 'didUnmount',
            hit: initHookName === 'onInit',
            weightValue: 2,
          }),
          Created: new hookEntity({
            customhook,
            name: 'created',
            destroy: 'detached',
            hit: initHookName === 'created',
            weightValue: 3,
          }),
          Attached: new hookEntity({
            customhook,
            name: 'attached',
            destroy: 'detached',
            weightValue: 4,
          }),
          Show: new hookEntity({
            customhook,
            name: 'show',
            destroy: 'hide',
            weightValue: 5,
          }),
          DidMount: new hookEntity({
            customhook,
            name: 'didMount',
            destroy: 'didUnmount',
            hit: initHookName === 'didMount',
            weightValue: 6,
          }),
          Ready: new hookEntity({
            customhook,
            name: 'ready',
            destroy: 'detached',
            weightValue: 7,
          }),
          // 微信小程序组件所在页面的生命周期
          RouteDone: new hookEntity({
            customhook,
            name: 'routeDone',
            destroy: 'detached',
            weightValue: 8,
          }),
          Hide: new hookEntity({
            customhook,
            name: 'hide',
            destroy: 'show',
            weightValue: 9,
          }),
          Detached: new hookEntity({
            customhook,
            name: 'detached',
            destroy: 'attached',
            weightValue: 10,
          }),
        }),
    }
  );

const init = (hooks) => (diyHooks = hooks);

/**
 * 获取所有自定义钩子
 * return Array<string> diy钩子数组
 */
const getDiyHooks = () => Object.keys(diyHooks);

/**
 * 手动命中某属性钩子-待开发
 * @param1 <string> 单个钩子名
 * @param2 <string> 要改变的状态
 */
const setHit = (name, state) => {
  Hooks()[name][state ? 'cycleStart' : 'cycleEnd']();
};

/**
 * 使用js监听属性钩子-待开发
 * @param1 <string> 钩子名、这里只允许属性监听钩子
 * @param2 <function> 回调函数
 */
const on = (name, cb) => { };

export {
  Hooks,
  getDiyHooks,
  nativeAllHooks,
  lifetimesHooks,
  pageLifetimesHooks,
  nativeHooks,
  componentHooks,
  init,
  setHit,
  on,
};
