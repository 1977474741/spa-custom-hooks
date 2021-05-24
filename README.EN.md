<div align="center">
 <img src="https://pubser-res.zhenai.com/other/temp/202105/24/16494052710198.png?imageMogr2/thumbnail/436x"/>
 
[![license](https://img.shields.io/badge/license-%20MIT-blue.svg)](https://github.com/1977474741/vue-custom-hooks/blob/main/LICENSE) [![license](https://img.shields.io/badge/npm-v1.1.1-yellow)](https://www.npmjs.com/package/vue-custom-hooks)
 
**English | [简体中文](./README.md)**

</div>

- [What is vue-custom-hooks? ](#head1)
- [ what's it for? ](#head2)
- [Let’s have some real scenes](#head3)
    - [Scheme 1, monitor whether the store has received user information in the page && dom tree rendering is complete. ](#head4)
    - [Option 2. To obtain user information on the page, it is also necessary to determine whether both conditions are met. ](#head5)
- [Use vue-custom-hooks to achieve the above scenario](#head6)
- [Registration parameter description](#head7)
    - [Register CustomHook](#head8)
    - [diyHooks object description](#head9)
- [ how to use? ](#head10)
- [Hook usage rules](#head11)
- [Built-in native hook](#head12)
- [Demo QR Code](#head13)
- [Into the group exchange](#head14)

## <span id="head1"> What is vue-custom-hooks? </span>
- A thing that can customize vue component hooks. You can register global asynchronous tasks and automatically execute related hooks in the page when the conditions are met.
- Supports the use of created, mounted, etc. with vue's native hooks.
- Support traditional h5, mpvue, uni-app

## <span id="head2"> What is it for? </span>

Solve the problem of needing to monitor multiple global states at the same time in the business page

## <span id="head3"> Let’s have some real scenes</span>
To enter the Mini Program for the first time, users need to log in onLaunch of app.vue to obtain the token and user information, and then save it in the store. Now we are going to make a page, come in and render the user's avatar, nickname, etc. on the canvas. The key point is that the two conditions must be met.

##### <span id="head4">Scheme 1. Monitor on the page whether the store has received user information && dom tree rendering is complete. </span>
```javascript
//Disadvantages: more troublesome, high coupling, the pages used have to monitor the changes of userinfo and the rendering of the dom tree, there are many repetitive codes, which is not conducive to maintenance
data(){
    return{
        //Number of tasks completed
        num: 0
    }
},
computed: {
    userInfo: function(){
        return this.$store.state.userInfo
},
watch:{
    userInfo(newval,oldval){
        //Listen to get user information
        if(newval.nickName){
            this.num++;
            if(this.num == 2){
                //Can render the canvas
                renderCanvas();
            }
        }
    }
},
mounted(){
    //dom rendering completed
    this.num++;
    if(this.num == 2){
        //Can render the canvas
        renderCanvas();
    }
}
```

##### <span id="head5"> Solution 2. Get user information on the page && dom tree rendering is complete. </span>
```javascript
//Disadvantages: similar to solution 1, the pages used have to write methods for obtaining user information and monitor the rendering of the dom tree
data(){
    return{
        //Number of tasks completed
        num: 0
    }
},
computed: {
    userInfo: function(){
        return this.$store.state.userInfo
},
methods:{
    getUserInfo(cb){
        //Initiate a request to obtain user information
        let userinfo = {nickName:'Zhang San'};
        this.$store.commit('userinfo',userinfo);
        cb()
    }
},
created(){
    this.getUserInfo(()=>{
        this.num++;
        if(this.num == 2){
            //Can render the canvas
            renderCanvas();
        }
    })
},
mounted(){
    //dom rendering completed
    this.num++;
    if(this.num == 2){
        //Can render the canvas
        renderCanvas();
    }
},
```

#### <span id="head6"> Use vue-custom-hooks to achieve the above scenarios</span>
```javascript
//The first step is to install the plug-in:
npm install vue-custom-hooks

//The second step is to register the plug-in in the entry file:
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

//The third step is to use plug-ins in business pages (any page can be used, with low coupling and less repetitive code):
onMountedUserInfo(){
    //Can render the canvas
    renderCanvas();
}

```

## <span id="head7"> Registration parameter description</span>
- #### <span id="head8"> Register CustomHook</span>
````javascript
import CustomHook from'vue-custom-hooks';
Vue.use(CustomHook,diyHooks)
````

- #### <span id="head9"> diyHooks object description</span>
````javascript
{
    //1. Register the attribute monitoring hook
    //UserInfo, the single name of the hook, the first letter is capitalized
    'UserInfo':{
        //name, the full name of the hook, it can be the same as the key above if the monitoring attribute is required, it is required
        name:'UserInfo',
        //The name of the attribute to be monitored by watchKey, the attribute monitoring hook mode is required
        watchKey:'$store.state.userinfo',
        //Whether to hit by default, not required
        hit: false,
        //deep Whether to monitor in depth, not required
        deep: true,
        //The callback executed when the onUpdate property is changed is used to determine whether to hit this hook. It is not required. The default value is equivalent to returning!! val
        onUpdate(val){
            //This means that userinfo contains nickName and hits this hook. Note that you cannot return asynchronously
            return !!val.nickName;
        }
    },
    
    //2. Register event listener hook
    //BeforeMount, hook single name, first letter capitalized
    'BeforeMount':{
        //name, the name of the native hook, used to hit this hook, required
        name:'beforeMount',
        //destroy, the opposite hook name, used to cancel the hit, the event listener hook is required
        destroy:'destroyed',
        //Whether to hit by default, not required
        hit: false
    }
}
````

## <span id="head10"> How to use? </span>
````javascript
export default {
    name:'Home',
    created(){
        //Data initialization is complete
    },
    mounted(){
        //dom rendering completed
    },
    onCreatedUserInfo(){
        //Data initialization is complete && Obtaining user information is complete
    },
    onMountedUserInfo(){
        //dom rendering completed && access to user information completed
    }
}
````

## <span id="head11"> Hook usage rules</span>
````javascript
`on{UserInfo}{BeforeMount}{Login}{Position}...` //All registered hooks can be matched at will, the arrangement order does not affect the execution of the hooks, they are all in && relationship
````

## <span id="head12"> Registered native hooks</span>
````javascript
Launch, Created, Load, Attached, Show, Mounted, Ready
//↓↓↓If you need other hooks, you can register by yourself↓↓↓
````
- [diyHooks object description](#head9)

## <span id="head13"> Demo QR code</span>
![left image description here](https://pubser-res.zhenai.com/other/temp/202103/20/16460141027094.png?imageMogr2/thumbnail/200x200)
    
If you have any good suggestions, please raise issues or pr

If you like, point a star