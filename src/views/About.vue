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
	onLoginCreated(){
		this.$store.commit('logs','onLoginCreated钩子执行(about.vue)');
	},
	onLoginMounted(){
		this.$store.commit('logs','onLoginMounted钩子执行(about.vue)');
	},
	onUserInfoCreated(){
		this.$store.commit('logs','onUserInfoCreated钩子执行(about.vue)');
	},
	onLoginUserInfoCreated(){
		this.$store.commit('logs','onLoginUserInfoCreated钩子执行(about.vue)');
	}
}
</script>