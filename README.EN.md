<div align="center">
<img src="https://photo.zastatic.com/images/common-cms/it/20220106/1641464912638_340742_t.png"/>
<h1 align="center"> spa-custom-hooks </h1>

[![license](https://img.shields.io/badge/license-%20MIT-blue.svg)](https://github.com/1977474741/spa-custom-hooks/blob/main/LICENSE) [![license](https://img.shields.io/npm/v/spa-custom-hooks?color=red)](https://www.npmjs.com/package/spa-custom-hooks) [![license](https://img.shields.io/bundlephobia/min/spa-custom-hooks)](https://www.npmjs.com/package/spa-custom-hooks) [![ license](https://img.shields.io/github/last-commit/1977474741/spa-custom-hooks)](https://github.com/1977474741/spa-custom-hooks/commits/main) [ ![license](https://img.shields.io/github/stars/1977474741?style=social)](https://github.com/1977474741)

**Simplified Chinese | [English](./README.EN.md)**

</div>

-   [What are spa-custom-hooks? ](#head1)
-   [ what's it for? ](#head2)
-   [Common application scenarios](#head3)
-   [Usage example](#head4)
-   [Registration parameter description](#head5)
    -   [Register CustomHook](#head6)
    -   [ diyHooks object description](#head7)
-   [Rules for using hooks (must read for use)](#head8)
-   [Built-in native hooks](#head9)
-   [Demo QR code](#head10)
-   [Join the group to communicate](#head11)

## <span id="head1">What are spa-custom-hooks? </span>

-   A tool that can customize page hooks. You can register global asynchronous tasks and define the triggering conditions of the hooks. When the conditions are met, the relevant hooks in the page can be automatically executed.
-   Supports free use with Vue's native hooks created, mounted, etc.
-   Supports Vue architecture (including uni-app, wepy, mpvue, etc.) and various small programs (WeChat, Alipay, Byte, etc.).
-   The latest version supports the use of all native applet components, including lifetimes and pageLifetimes hooks, and has adapted the uniapp hook separately.

## <span id="head2"> What is it used for? </span>

-   Handle the relationship between global data and intra-page logic in a simple and elegant way, mostly asynchronous issues.
-   Enhance the combination of life cycle hooks to solve the problem of logical execution timing within the page.

## <span id="head3"> Common application scenarios</span>

```javascript
export default {
    name: 'Home',
    onCreatedLogin() {
        //Login successful (get token) && Page initialization completed
        //Tips: Suitable for scenarios where the request sent by a page depends on token
    },
    onCreatedUserInfo() {
        //Page initialization completed && Obtaining user information completed
        //Tips: Suitable for scenarios where user information needs to be used to make judgments during page initialization before proceeding with page logic.
    },
    onMountedUserInfo() {
        //dom rendering completed && obtaining user information completed
        //Tips: Suitable for similar scenarios where the avatar needs to be rendered on canvas when entering the page for the first time.
    },
    onReadyShow() {
        //Page rendering in the mini program is completed && page display
        //Tips: Suitable for scenarios where mini program components or DOM need to be obtained and executed every time the page is displayed.
    },
};
```

## <span id="head4"> Usage example</span>

_[Click to view the code snippet of the mini program](https://developers.weixin.qq.com/s/pUQ4Xkma79xd)_

```javascript
//The first step is to install the plug-in:
npm install spa-custom-hooks --save

//The second step is to register the plug-in in the entry file:
import CustomHook from 'spa-custom-hooks';
const diyHooks = {
      'UserInfo':{
         name:'UserInfo',
         watchKey: ['userinfo'],
         deep: true,
         onUpdate(val){
             //The nickName in userinfo is not empty, which means this hook is hit.
             return !!val.nickName;
         }
     }
}
//1.Vue architecture registration method
import store from './store'
Vue.use(CustomHook, diyHooks, store)
//2. Registration method of native mini program
//Define globalData in advance
const globalData = {
     userinfo: {
         nickName: ''
     }
}
CustomHook.install(diyHooks,globalData)

//The third step, use the plug-in in the business page (can be used on any page, with low coupling and less repetitive code):
onLoadUserInfo(){
     //can render canvas
     renderCanvas();
}
```

## <span id="head5"> Registration parameter description</span>

#### <span id="head6"> Register CustomHook</span>

```javascript
//vue architecture-main.js
import store from './store';
import CustomHook from 'spa-custom-hooks';
Vue.use(CustomHook, diyHooks, store);
//Native applet architecture-app.js
import CustomHook from 'spa-custom-hooks';
CustomHook.install(diyHooks, globalData);
```

#### <span id="head7"> diyHooks object description</span>

```javascript
{
     //1. Register attribute listening hook
     //Registered hook name, first letter capitalized
     'UserInfo':{
         //name, the full name of the hook. If the monitoring attribute is the same as the key above, it is required.
         name:'UserInfo',
         //The attribute name in the store to be monitored by watchKey (equivalent to state.userinfo), required for attribute monitoring hook mode string | Array<string>
         watchKey: ['userinfo'],
         //Whether it is hit by default, optional
         hit: false,
         //deepWhether deep monitoring is required, optional
         deep: true,
         //The callback executed when the onUpdate attribute changes, used to decide whether to hit this hook. It is optional. The default value is equivalent to returning !!val.
         onUpdate(val){
             //Here it means that if userinfo contains nickName, this hook will be hit. Note that asynchronous return is not allowed
             return !!val.nickName;
         }
     },

     //2. Register life cycle listening hook
     //Registered hook name, first letter capitalized
     'BeforeMount':{
         //name, the name of the native hook to be monitored, used to hit this hook, required
         name:'beforeMount',
         //destroy, the opposite hook name, used to cancel the hit, event listening hook is required
         destroy:'destroyed',
         //Whether it is hit by default, optional
         hit: false,
         //Used to specify the execution order when conditions are met simultaneously with other life cycle hooks. The smaller value is executed first. Please refer to hooks.js
         weightValue: 4,
     }
}
```

## <span id="head8"> Hook usage rules (must read for use)</span>

```javascript
`on{UserInfo}{BeforeMount}{Login}{Position}...`; //All registered hooks can be matched at will. The order of arrangement does not affect the execution of the hooks. They are all related by &&
```

#### pay attention:

-   The above rules apply to all custom hooks, including App, Page, Component, lifetimes and pageLifetimes in Component, all must be prefixed with on.
-   There can only be one same custom hook in App, Page, and Component, and the one within lifetimes takes precedence.
-   The use of custom hooks within Mixin on each platform is not supported.

## <span id="head9"> Registered life cycle hook</span>

-   [Detailed configuration of registered hooks](https://github.com/1977474741/spa-custom-hooks/blob/main/lib/spa-custom-hooks/hooks.js)
-   [ diyHooks object description](#head7)

## <span id="head10"> Demo QR code</span>

![left image description here](https://photo.zastatic.com/images/common-cms/it/20220531/1653983381580_599944_t.png?imageMogr2/thumbnail/200x200)

## <span id="head11"> Join the group to communicate</span>

![left image description here](https://pubser-res.zhenai.com/other/temp/202103/20/17024414117439.png?imageMogr2/thumbnail/203x203)

If you have any good suggestions, please submit issues or PR.

If you like it, click a star
