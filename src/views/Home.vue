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
	onCreatedLogin(){
		this.$store.commit('logs','onCreatedLogin钩子执行(home.vue)');
	},
	onCreatedUserInfo(){
		this.$store.commit('logs','onCreatedUserInfo钩子执行(home.vue)');
	},
	onCreatedLoginUserInfo(){
		this.$store.commit('logs','onCreatedLoginUserInfo钩子执行(home.vue)');
	},
	onMountedLogin(){
		this.$store.commit('logs','onMountedLogin钩子执行(home.vue)');
	},
	onMountedUserInfo(){
		this.$store.commit('logs','onMountedUserInfo钩子执行(home.vue)');
	},
	onMountedLoginUserInfo(){
		this.$store.commit('logs','onMountedLoginUserInfo钩子执行(home.vue)');
	},
}
</script>
