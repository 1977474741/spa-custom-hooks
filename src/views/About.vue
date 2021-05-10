<template>
  <div class="about" style="background: #B05574;">
    <h1>This is an about page</h1>
  </div>
</template>

<script>

export default {
	name: 'about',
	created(){
		this.$store.commit('logs','created钩子执行(about.vue)');
	},
	mounted(){
		this.$store.commit('logs','mounted钩子执行(about.vue)');
	},
	onCreatedLogin(){
		this.$store.commit('logs','onCreatedLogin钩子执行(about.vue)');
	},
	onCreatedUserInfo(){
		this.$store.commit('logs','onCreatedUserInfo钩子执行(about.vue)');
	},
	onCreatedLoginUserInfo(){
		this.$store.commit('logs','onCreatedLoginUserInfo钩子执行(about.vue)');
	},
	onMountedLogin(){
		this.$store.commit('logs','onMountedLogin钩子执行(about.vue)');
	},
	onMountedUserInfo(){
		this.$store.commit('logs','onMountedUserInfo钩子执行(about.vue)');
	},
	onMountedLoginUserInfo(){
		this.$store.commit('logs','onMountedLoginUserInfo钩子执行(about.vue)');
	},
}
</script>