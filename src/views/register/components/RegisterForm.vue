<template>
	<a-form ref="registerFormRef" :model="registerForm" :rules="registerRules" size="large">
		<a-form-item class="login-form-item" name="username">
			<a-input v-model:value="registerForm.username" placeholder="用户名：admin / user">
				<template #prefix>
					<user-outlined />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item class="login-form-item" name="password">
			<a-input-password v-model:value="registerForm.password" placeholder="密码：123456">
				<template #prefix>
					<lock-outlined />
				</template>
			</a-input-password>
		</a-form-item>
		<a-form-item class="login-form-item" name="phonenumber">
			<a-input v-model:value="registerForm.phonenumber" placeholder="电话：13678473890">
				<template #prefix>
					<PhoneOutlined />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item class="login-form-item" name="email">
			<a-input v-model:value="registerForm.email" placeholder="邮箱：13678473890@qq.com">
				<template #prefix>
					<MailOutlined />
				</template>
			</a-input>
		</a-form-item>
	</a-form>
	<div class="login-btn">
		<a-button shape="round" size="large" class="login-button" @click="resetForm(registerFormRef)">
			<template #icon>
				<close-circle-outlined />
			</template>
			{{ $t("login.reset") }}
		</a-button>
		<a-button shape="round" size="large" type="primary" class="login-button" @click="login(registerFormRef)">
			<template #icon>
				<user-outlined />
			</template>
			{{ $t("login.register") }}
		</a-button>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import { registerApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { getTimeState } from "@/utils/util";
import { HOME_URL } from "@/config";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";

const router = useRouter();
const tabsStore = useTabsStore();
const userStore = useUserStore();
const keepAliveStore = useKeepAliveStore();

// 定义 formRef (校验规则)
const registerFormRef = ref<FormInstance>();
const registerRules = reactive({
	username: [{ required: true, message: "请输入用户名!", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码!", trigger: "blur" }]
});

const loading = ref(false);
const registerForm = reactive<{ username: string; password: string; phonenumber: string; email: string }>({
	username: "",
	password: "",
	phonenumber: "",
	email: ""
});
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let promise = formEl.validate().then(async valid => {
		// if (!valid) return;
		loading.value = true;
		try {
			// 1.执行登录接口
			const { data } = await registerApi({
				...registerForm
			});
			// const { data } = await loginApi({ ...loginForm, password: loginForm.passwor/d });
			console.log(data);
			userStore.setToken("Bearer " + data.token);
			userStore.setUserInfo({ name: registerForm.username });
			await initDynamicRouter();

			// userStore.setToken("Bearer " + data.token);
			// userStore.setUserInfo({ name: loginForm.username });
			// 2.添加动态路由
			await initDynamicRouter();
			// console.log("sdfsfs");
			// 3.清空 tabs、keepAlive 保留的数据
			tabsStore.closeMultipleTab();
			keepAliveStore.setKeepAliveName();

			// 4.跳转到首页
			router.push(HOME_URL);
			notification["success"]({
				message: getTimeState(),
				description: "注册成功",
				style: { borderRadius: "8px" },
				duration: 3
			});
		} finally {
			loading.value = false;
		}
	});
};

// 清空登录表单
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

onMounted(() => {
	// 监听enter事件（调用登录）
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			login(registerFormRef.value);
		}
	};
});
</script>

<style scoped lang="less">
@import url("../index.less");
</style>
