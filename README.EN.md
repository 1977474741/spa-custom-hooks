

<div align="center">
<img src="https://photo.zastatic.com/images/common-cms/it/20220106/1641464912638_340742_t.png"/>
<h1 align="center"> spa-custom-hooks </h1>

[![license](https://img.shields.io/badge/license-%20MIT-blue.svg)](https://github.com/1977474741/spa-custom-hooks/blob/main/LICENSE ) [![license](https://img.shields.io/npm/v/spa-custom-hooks?color=red)](https://www.npmjs.com/package/spa-custom-hooks ) [![license](https://img.shields.io/bundlephobia/min/spa-custom-hooks)](https://www.npmjs.com/package/spa-custom-hooks) [![ license](https://img.shields.io/github/last-commit/1977474741/spa-custom-hooks)](https://github.com/1977474741/spa-custom-hooks/commits/main) [ ![license](https://img.shields.io/github/stars/1977474741?style=social)](https://github.com/1977474741)

**Simplified Chinese | [English](./README.EN.md)**
</div>

- [What is spa-custom-hooks? ](#head1)
- [ what's it for? ](#head2)
- [Common application scenarios](#head3)
- [Example of use](#head4)
- [Registration parameter description](#head5)
    - [Register CustomHook](#head6)
    - [diyHooks object description](#head7)
- [Hook usage rules](#head8)
- [Built-in native hook](#head9)
- [Demo QR Code](#head10)
- [Into the group exchange](#head11)

## <span id="head1">What is spa-custom-hooks? </span>
- A thing that can customize page hooks, you can register global asynchronous tasks, define the triggering conditions of the hooks yourself, and automatically execute the relevant hooks in the page when the conditions are met.
- Supports the use of created, mounted, etc. with vue's native hooks.
- Support vue architecture (including uni-app, wepy, mpvue, etc.) and various small programs.

## <span id="head2"> What is it for? </span>

Solve the problem of page logic relying on global asynchronous data in a simple and elegant way

## <span id="head3"> Common application scenarios</span>
````javascript
export default {
    name:'Home',
    onCreatedLogin(){
        //Successful login (get the token) && page initialization completed
        //Tips: Suitable for scenarios where the request sent by a page depends on the token
    },
    onCreatedUserInfo(){
        //Page initialization is complete && Obtaining user information is complete
        //Tips: Suitable for scenarios where user information needs to be used to make judgments when the page is initialized, and then go to the page logic
    },
    onMountedUserInfo(){
        //dom rendering completed && access user information completed
        //Tips: Suitable for similar scenes where the avatar needs to be rendered on the canvas when entering the page for the first time
    },
    onReadyShow(){
        //The page rendering in the applet is completed && page display
        //Tips: Suitable for scenarios where you need to obtain small program components or dom, and will be executed every time the page is displayed
    },
}
````

## <span id="head4"> Usage example</span>
*[Click to view the snippet of applet code](https://developers.weixin.qq.com/s/pUQ4Xkma79xd)*
```javascript
//The first step is to install the plug-in:
npm install spa-custom-hooks

//The second step is to register the plug-in in the entry file:
import CustomHook from'spa-custom-hooks';
const diyHooks = {
     'UserInfo':{
        name:'UserInfo',
        watchKey:'userinfo',
        deep: true,
        onUpdate(val){
            // If the nickName in userinfo is not empty, it means that the hook is hit
            return !!val.nickName;
        }
    }
}
//1. Registration method of vue architecture
import store from'./store'
Vue.use(CustomHook ,diyHooks,store)
//2. Registration method of native applet
//Define globalData in advance
const globalData = {
    userinfo: {
        nickName:''
    }
}
CustomHook.install(diyHooks,globalData)

//The third step is to use plug-ins in the business page (any page can be used, with low coupling and less repetitive code):
onLoadUserInfo(){
    //Can render canvas
    renderCanvas();
}
```

## <span id="head5"> Registration parameter description</span>
#### <span id="head6"> Sign up for CustomHook</span>
````javascript
//vue architecture-main.js
import store from'./store'
import CustomHook from'spa-custom-hooks';
Vue.use(CustomHook,diyHooks,store)
//Native applet architecture-app.js
import CustomHook from'spa-custom-hooks';
CustomHook.install(diyHooks,globalData)
````

#### <span id="head7"> diyHooks object description</span>
````javascript
{
    //1. Register the attribute monitoring hook
    //UserInfo, hook single name, initial letter capitalized
    'UserInfo':{
        //name, the full name of the hook, it can be the same as the key above if the monitoring attribute is required, it is required
        name:'UserInfo',
        //The attribute name in the store to be monitored by watchKey (equivalent to $store.state.userinfo), the attribute monitoring hook mode is required
        watchKey:'userinfo',
        //Whether to hit by default, not required
        hit: false,
        //deep Whether to monitor deeply, not required
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

## <span id="head8"> Hook usage rules</span>
````javascript
`on{UserInfo}{BeforeMount}{Login}{Position}...` //All registered hooks can be matched at will, the arrangement order does not affect the execution of the hooks, they are all in && relationship
````

## <span id="head9"> Registered life cycle hooks</span>
````javascript
Launch, Created, Load, Attached, Show, Mounted, Ready
//↓↓↓If you need other hooks, you can register by yourself↓↓↓(If a hook of the current framework and its corresponding opposite hook are inconsistent with the following configuration, you also need to manually register, for example, wepy has created but not destroyed)
````
- [Detailed configuration of registered hooks](https://github.com/1977474741/spa-custom-hooks/blob/main/lib/spa-custom-hooks/hooks.js)
- [diyHooks object description](#head7)

## <span id="head10"> Demo QR code</span>
![left image description here](https://pubser-res.zhenai.com/other/temp/202103/20/16460141027094.png?imageMogr2/thumbnail/200x200)

## <span id="head11"> Join group communication</span>
![left image description here](https://pubser-res.zhenai.com/other/temp/202103/20/17024414117439.png?imageMogr2/thumbnail/203x203)

If you have any good suggestions, please raise issues or pr

Click a star if you like