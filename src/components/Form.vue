<template>
	<div class="form-container">
		<form>
			<div class="form-header">
				<h3 class="form-name">Регистрация</h3>
				<div class="button-back">
					<img src="@/assets/back-arrow.png" alt="" class="back-img">
					<router-link to="/">
						<div class="text-back">назад</div>
					</router-link>
				</div>
			</div>
			<div class="inputs-container">
				<LogInput  v-for="i in 3" :key="i"/>
				<div class="error-text">Поле для отображения ошибки</div>
				<div class="button-log">Зарегистрирвоаться</div>
				<div class="other-button">Войти</div>
			</div>
		</form>
	</div>
</template>

<script>
	import LogInput from '@/components/Input.vue';

	export default {
		name: 'LogForm',
		components: {
			LogInput
		}
	}
</script>
	
<style lang="scss">
	@import '@/scss/form.scss';
</style>