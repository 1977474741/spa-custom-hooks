export default class hookEntity {
    constructor({customhook,name,destroy,hit = false,watchKey,onUpdate}) {
        this.name = name;
        this.destroy = destroy;
        // hit是在是生命周期钩子的情况下才有用，属性监听钩子是检测时（triggerHook）实时判断的，没有用hit属性
        this.hit = hit;
        this.need = false;
        this.initFlag = false;
        this.watchKey = watchKey;
        this.onUpdate = onUpdate;
        this.__customhook = customhook;
    }
    init() {
        if (this.initFlag) return;
        let that = this;
        this[`watch${this.watchKey?'Attr':'Hook'}`]((success) => {
            this[success ? 'cycleStart' : 'cycleEnd']();
        });
        this.initFlag = true;
    }
    cycleStart() {
        if(this.hit) return;
        this.hit = true;
        this.__customhook.triggerHook();
    }
    cycleEnd() {
        if(!this.hit) return
        this.hit = false;
        this.__customhook.resetExecute(this.name);
    }
    watchHook(cb) {
        let customhook = this.__customhook,
            page = customhook.pageInstance,
            pageNativeHooks = customhook.pageNativeHooks,
            that = this;
        if(customhook.isNativeHookCache) return;
        const hooks = [
            {
                name: 'start',
                hooks: pageNativeHooks[this.name],
                hookName: this.name,
                num: 0,
            },{
                name: 'stop',
                hooks: pageNativeHooks[this.destroy],
                hookName: this.destroy,
                num: 0,
            }
        ];
        hooks.forEach((item)=>{
            item.hooks.forEach((f,i)=>{
                item.hooks[i] = (e) => {
                    f.call(page, e);
                    item.num ++;
                    if(item.num == item.hooks.length){
                        if(e){
                            customhook.options = e;
                        }
                        cb(item.name == 'start');
                        item.num = 0;
                        if(item.hookName == 'destroyed' || item.hookName == 'onUnload'){
                            // console.log('销毁监听',that.__customhook.pageHooks.name);
                            that.__customhook.unWatchs.forEach( e =>e())
                        }
                    }
                }
            })
        })
    }
    watchAttr(cb) {
        let that = this;
        let unWatch = this.__customhook.pageInstance.$watch(this.watchKey, {
            immediate: false,
            handler:(val, oldvue) => {
                // console.log(that.__customhook.pageHooks.__file,'登录状态改变',val);
                cb(that.onUpdate ? that.onUpdate(val, oldvue) : val);
            }
        });
        this.__customhook.unWatchs.push(unWatch);
    }
    getVal(obj,keyStr){
        return keyStr.split('.').reduce((obj,val) => obj[val],obj)
    }
}