<template>
  <div id="app">
    <button @click="clear">清屏</button>
    </br>
    <button @click="login">点击完成Login任务</button>
    <button @click="getUser">点击完成UserInfo任务</button>
    <router-view/>
    <div id="nav">
      <router-link :class="$route.name" to="/">Home</router-link> |
      <router-link :class="$route.name" to="/about">About</router-link>
    </div>
    <div class="logs">
      <div v-for="log in logs">
        <p v-if="log == 'line'" style="height: 2px;"></p>
        <p v-else :style="{background:log.indexOf('app.vue')!=-1?'red':log.indexOf('home.vue')!=-1?'#FAB87F':log.indexOf('about.vue')!=-1?'#B05574':'#000',color:log.indexOf('任务')!=-1?'white':'black'}">
          {{log}}
        </p>
      </div>
      <p id="bottom"></p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'App',
  computed: {
    logs(){
      return this.$store.state.logs;
    }
  },
  data(){
    return {
      route:{
        'Home':{
          bg:'#FAB87F'
        },
        'About':{
          bg:'#B05574'
        },
      }
    }
  },
  methods:{
    login(){
      this.$store.commit('loginType',1)
      this.$store.commit('logs','异步任务1完成（登录成功Login）');
    },
    getUser(){
      this.$store.commit('userinfo',{
        name:'张三'
      })
      this.$store.commit('logs','异步任务2完成（获取用户信息成功UserInfo）');
    },
    clear(){
      this.$store.commit('logClear');
    }
  },
  created(){
    this.$store.commit('logs','created钩子执行(app.vue)');
  },
  mounted(){
    this.$store.commit('logs','mounted钩子执行(app.vue)');
  },
  onLoginCreated(){
    this.$store.commit('logs','onLoginCreated钩子执行(app.vue)');
  },
  onLoginMounted(){
    this.$store.commit('logs','onLoginMounted钩子执行(app.vue)');
  },
  onUserInfoCreated(){
    this.$store.commit('logs','onUserInfoCreated钩子执行(app.vue)');
  },
  onLoginUserInfoCreated(){
    this.$store.commit('logs','onLoginUserInfoCreated钩子执行(app.vue)');
  }
}
</script>
<style>
html,body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
  -webkit-font-smoothing: antialiased;
  -webkit-user-select:none;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.Home{
  color: #FAB87F;
}
.About{
  color: #B05574;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 8vw;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.logs{
  overflow-y: auto;
  width:100%;
  height: 60vh;
  background: #CCDEAD;
  padding: 20px 0;
  padding-top: 20px;
}
p{
  line-height: 20px;
  font-size: 15px;
  margin: 0;
}
button{
  width:40vw;
  height: 8vw;
  margin: 2vw;
  margin-bottom: 0;
}
</style>
