<template>
	<a-form ref="formRef" :model="formCourse" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
		<a-form-item ref="courseno" label="课程号" name="courseno">
			<a-input v-model:value="formCourse.courseno" />
		</a-form-item>
		<a-form-item ref="coursename" label="课程名称" name="coursename">
			<a-input v-model:value="formCourse.coursename" />
		</a-form-item>
		<a-form-item ref="credit" label="学分" name="credit" :rules="[{ type: 'number', min: 0, max: 5 }]">
			<a-input-number v-model:value="formCourse.credit"></a-input-number>
		</a-form-item>
		<a-form-item ref="credithour" label="学时" name="credithour" :rules="[{ type: 'number', min: 0, max: 99 }]">
			<a-input-number v-model:value="formCourse.credithour"></a-input-number>
		</a-form-item>
		<a-form-item label="课程类型" name="coursetype">
			<a-radio-group v-model:value="formCourse.coursetype">
				<a-radio value="1">必修</a-radio>
				<a-radio value="2">选修</a-radio>
			</a-radio-group>
		</a-form-item>
		<a-form-item label="课程类型" name="coursetype">
			<a-radio-group v-model:value="formCourse.experimenttype">
				<a-radio value="1">单开实验</a-radio>
				<a-radio value="2">课内实验</a-radio>
			</a-radio-group>
		</a-form-item>
		<a-form-item ref="description" label="描述" name="description">
			<a-textarea v-model:value="formCourse.description" />
		</a-form-item>

		<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
			<a-button type="primary" @click="onSubmit">Submit</a-button>
			<a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
		</a-form-item>
	</a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";
import type { UnwrapRef } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { Class } from "@/api/interface";
import { addCourse } from "@/api/modules/class";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const router = useRouter();
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formCourse: UnwrapRef<Class.Course> = reactive({
	courseno: "",
	coursename: "",
	credit: "0",
	credithour: "0",
	coursetype: "1",
	experimenttype: "1",
	description: ""
});

// 添加简单的校验规则
const rules: Record<string, Rule[]> = {
	courseno: [
		{ required: true, message: "请输入课程编号", trigger: "change" },
		{ min: 12, max: 12, message: "Length should be 12", trigger: "blur" }
	],
	coursename: [{ required: true, message: "请输入课程名称", trigger: "change" }],
	credit: [{ required: true, message: "请输入学分", trigger: "change" }],
	credithour: [{ required: true, message: "请输入学时", trigger: "change" }],
	coursetype: [{ required: true, message: "请选择课程类型", trigger: "change" }],
	experimenttype: [{ required: true, message: "请选择实验类型", trigger: "change" }],
	description: [{ required: false, message: "请选择实验类型", trigger: "change" }],
	date1: [{ required: true, message: "Please pick a date", trigger: "change", type: "object" }],
	type: [
		{
			type: "array",
			required: true,
			message: "Please select at least one activity type",
			trigger: "change"
		}
	],
	resource: [{ required: true, message: "Please select activity resource", trigger: "change" }],
	desc: [{ required: true, message: "Please input activity form", trigger: "blur" }]
};
const onSubmit = () => {
	formRef.value
		.validate()
		.then(async () => {
			const aa = await addCourse(toRaw(formCourse));
			if (aa.code === undefined) {
				message.error("你没有权限添加课程");
			} else {
				router.push("/table/course");
			}
		})
		.catch((error: any) => {
			console.log("error", error);
		});
};
const resetForm = () => {
	formRef.value.resetFields();
};
</script>
