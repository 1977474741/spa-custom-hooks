/**
 * @Author      鹅鹅鹅
 * @description 单个hook处理工厂
 */
import { getStore, getVal } from './utils.js';
export default class hookEntity {
    constructor({ customhook, name, destroy, hit = false, watchKey, onUpdate, type, weightValue }) {
        // 钩子名
        this.name = name;
        // 相反钩子名
        this.destroy = destroy;
        // 钩子类型 app、page、component
        this.type = type;
        // hit是在是生命周期钩子的情况下才有用，属性监听钩子是检测时（triggerHook）实时判断的，没有用hit属性
        this.hit = hit;
        // 需要监听的key
        this.watchKey = watchKey;
        // 权重值，决定了和其他钩子同时满足条件时执行先后顺序
        this.weightValue = weightValue;
        // 是否已经初始化
        this.initFlag = false;
        // 属性监听回调
        this.onUpdate = onUpdate;
        this.__customhook = customhook;
    }
    init() {
        if (this.initFlag) return;
        if (this.watchKey) {
            this.unwatchFn = this.watchAttr((success) => {
                this[success ? 'cycleStart' : 'cycleEnd']();
            });
        }
        this.initFlag = true;
    }
    cycleStart() {
        if (this.hit) return;
        this.hit = true;
        this.__customhook && this.__customhook.triggerHook(this.name);
    }
    cycleEnd() {
        if (!this.hit) return;
        this.hit = false;
        this.__customhook && this.destroy && this.__customhook.resetExecute(this.destroy);
    }
    watchAttr(cb) {
        try {
            const that = this;
            const store = getStore(this.__customhook.instance);
            const unwatchFn = store.watch(
                (state) => {
                    return getVal(state, that.watchKey);
                },
                (val, oldval) => {
                    cb(that.onUpdate ? that.onUpdate(val, oldval) : val);
                },
                {
                    //兼容mini-polyfill
                    watchKey: that.watchKey,
                }
            );
            return unwatchFn;
        } catch (err) {}
    }
}
