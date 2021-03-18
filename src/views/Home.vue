<template>
  <div class="home" style="background: #FAB87F;">
    <h1>This is an home page</h1>
  </div>
</template>

<script>
export default {
	name: 'Home',
	created(){
		this.$store.commit('logs','created钩子执行(home.vue)');
	},
	mounted(){
		this.$store.commit('logs','mounted钩子执行(home.vue)');
	},
	onLoginCreated(){
		this.$store.commit('logs','onLoginCreated钩子执行(home.vue)');
	},
	onUserInfoCreated(){
		this.$store.commit('logs','onUserInfoCreated钩子执行(home.vue)');
	},
	onLoginUserInfoCreated(){
		this.$store.commit('logs','onLoginUserInfoCreated钩子执行(home.vue)');
	},
	onLoginMounted(){
		this.$store.commit('logs','onLoginMounted钩子执行(home.vue)');
	}
}
</script>
