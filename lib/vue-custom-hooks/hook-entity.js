export default class hookEntity {
    constructor({customhook,name,destroy,hit = false,watchKey,onUpdate}) {
        // 钩子名
        this.name = name;
        // 相反钩子名
        this.destroy = destroy;
        // hit是在是生命周期钩子的情况下才有用，属性监听钩子是检测时（triggerHook）实时判断的，没有用hit属性
        this.hit = hit;
        // 是否采用
        this.need = false;
        // 是否已经初始化
        this.initFlag = false;
        // 属性监听key
        this.watchKey = watchKey;
        // 属性监听回调
        this.onUpdate = onUpdate;
        this.__customhook = customhook;
    }
    init() {
        if (this.initFlag) return;
        let that = this;
        if(this.watchKey){
            this.watchAttr((success) => {
                this[success ? 'cycleStart' : 'cycleEnd']();
            });
        }
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
    watchAttr(cb) {
        let that = this;
        this.__customhook.pageInstance.$watch(this.watchKey, {
            immediate: false,
            handler:(val, oldvue) => {
                cb(that.onUpdate ? that.onUpdate(val, oldvue) : val);
            }
        });
    }
}