

<div align="center">
 <img src="https://pubser-res.zhenai.com/other/temp/202105/24/16494052710198.png?imageMogr2/thumbnail/436x"/>
 
[![license](https://img.shields.io/badge/license-%20MIT-blue.svg)](https://github.com/1977474741/vue-custom-hooks/blob/main/LICENSE) [![license](https://img.shields.io/badge/npm-v1.1.1-yellow)](https://www.npmjs.com/package/vue-custom-hooks)
 
**简体中文 | [English](./README.EN.md)**

</div>

- [vue-custom-hooks 是什么？](#head1)
- [ 它有什么用？](#head2)
- [ 来点真实的场景吧](#head3)
    - [方案1、在页面里监听store是否拿到了用户信息 && dom树渲染完毕。](#head4)
    - [ 方案2、在页面里去获取用户信息，同样需要判断两个条件是否都满足。](#head5)
- [ 使用vue-custom-hooks实现以上场景](#head6)
- [ 注册参数说明](#head7)
    - [ 注册CustomHook](#head8)
    - [ diyHooks对象说明](#head9)
- [ 如何使用？](#head10)
- [ 钩子使用规则](#head11)
- [ 已经内置的原生钩子](#head12)
- [ Demo二维码](#head13)
- [ 进群交流](#head14)

## <span id="head1">vue-custom-hooks 是什么？</span>
- 一个可以定制vue组件钩子的东西，你可以注册全局的异步任务，满足条件时即可自动执行页面里相关的钩子。
- 支持和vue的原生钩子created，mounted等随意搭配使用。
- 支持传统h5、mpvue、uni-app

## <span id="head2"> 它有什么用？</span>

用简单优雅的方式解决业务页面里需要同时监听多个全局状态的问题

## <span id="head3"> 来点真实的场景吧</span>
用户首次进入小程序需要在app.vue的onLaunch登录获取token和用户信息（都是异步任务），然后存到store里。现在要做一个页面，进来把用户的头像昵称等渲染在canvas上，需求关键点在于两个条件都要满足。

##### <span id="head4">方案1、在页面里监听store是否拿到了用户信息 && dom树渲染完毕。</span>
```javascript
//缺点：比较麻烦，耦合度高，用到的页面都要监听userinfo的改变和dom树渲染完毕，重复性代码多，不利于维护
data(){
    return{
        //任务完成数
        num: 0
    }
},
computed: {
    userInfo: function(){
        return this.$store.state.userInfo
},
watch:{
    userInfo(newval,oldval){
        //监听拿到用户信息了
        if(newval.nickName){
            this.num++;
            if(this.num == 2){
                //可以渲染canvas了
                renderCanvas();
            }
        }
    }
},
mounted(){
    //dom渲染完毕
    this.num++;
    if(this.num == 2){
        //可以渲染canvas了
        renderCanvas();
    }
}
```

##### <span id="head5"> 方案2、在页面里去获取用户信息 && dom树渲染完毕。</span>
```javascript
//缺点：跟方案1差不多，用到的页面都要写获取用户信息的方法和监听dom树渲染完毕
data(){
    return{
        //任务完成数
        num: 0
    }
},
computed: {
    userInfo: function(){
        return this.$store.state.userInfo
},
methods:{
    getUserInfo(cb){
        //发起请求获取用户信息
        let userinfo = {nickName:'张三'};
        this.$store.commit('userinfo',userinfo);
        cb()
    }
},
created(){
    this.getUserInfo(()=>{
        this.num++;
        if(this.num == 2){
            //可以渲染canvas了
            renderCanvas();
        }
    })
},
mounted(){
    //dom渲染完毕
    this.num++;
    if(this.num == 2){
        //可以渲染canvas了
        renderCanvas();
    }
},
```

#### <span id="head6"> 使用vue-custom-hooks实现以上场景</span>
```javascript
//第一步，安装插件：
npm install vue-custom-hooks

//第二步，入口文件里注册插件：
import CustomHook from 'vue-custom-hooks';
Vue.use(CustomHook ,{
     'UserInfo':{
        name:'UserInfo',
        watchKey: '$store.state.userinfo',
        deep: true,
        onUpdate(val){
            //userinfo里含有nickName则表示命中此钩子
            return !!val.nickName;
        }
    }
})

//第三步，业务页面里使用插件（任何页面都可以使用，耦合度低，重复性代码少）：
onMountedUserInfo(){
    //可以渲染canvas了
    renderCanvas();
}

```

## <span id="head7"> 注册参数说明</span>
- #### <span id="head8"> 注册CustomHook</span>
````javascript
import CustomHook from 'vue-custom-hooks';
Vue.use(CustomHook,diyHooks)
````

- #### <span id="head9"> diyHooks对象说明</span>
````javascript
{
    //1.注册属性监听钩子
    //UserInfo，钩子单名，首字母大写
    'UserInfo':{
        //name，钩子全称，监听属性的话可以和上面的key一致，必填
        name:'UserInfo',
        //watchKey要监听的属性名，属性监听钩子模式必填
        watchKey: '$store.state.userinfo',
        //是否默认命中,非必填
        hit: false,
        //deep是否深度监听，非必填
        deep: true,
        //onUpdate属性改变时执行的callback，用来决定是否要命中此钩子，非必填，缺省值相当于返回了!!val
        onUpdate(val){
            //这里表示userinfo里含有nickName则命中此钩子。注意不可以异步return
            return !!val.nickName;
        }
    },
    
    //2.注册事件监听钩子
    //BeforeMount，钩子单名，首字母大写
    'BeforeMount':{
        //name，原生钩子名，用来命中此钩子，必填
        name:'beforeMount',
        //destroy，相反的钩子名，用来取消命中，事件监听钩子必填
        destroy:'destroyed',
        //是否默认命中,非必填
        hit: false
    }
}
````

## <span id="head10"> 如何使用？</span>
````javascript
export default {
    name: 'Home',
    created(){
        //数据初始化完成
    },
    mounted(){
        //dom渲染完成
    },
    onCreatedUserInfo(){
        //数据初始化完成 && 获取用户信息完成
    },
    onMountedUserInfo(){
        //dom渲染完成 && 获取用户信息完成
    }
}
````

## <span id="head11"> 钩子使用规则</span>
````javascript
`on{UserInfo}{BeforeMount}{Login}{Position}...` //所有注册好的钩子都可以随意搭配，排列顺序不影响钩子执行，都是 && 的关系
````

## <span id="head12"> 已经注册好的原生钩子</span>
````javascript
Launch、Created、Load、Attached、Show、Mounted、Ready
//↓↓↓如需其他的钩子可自行注册↓↓↓
````
- [ diyHooks对象说明](#head9)

## <span id="head13"> Demo二维码</span>
![left image description here](https://pubser-res.zhenai.com/other/temp/202103/20/16460141027094.png?imageMogr2/thumbnail/200x200)
    
## <span id="head14"> 进群交流</span>
![left image description here](https://pubser-res.zhenai.com/other/temp/202103/20/17024414117439.png?imageMogr2/thumbnail/203x203)

如果有什么好的建议欢迎提issues或者提pr

喜欢的话点个star

