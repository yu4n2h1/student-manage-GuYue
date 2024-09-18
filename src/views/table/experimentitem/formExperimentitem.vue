<template>
	<a-form ref="formRef" :model="formExperimentitem" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
		<a-form-item ref="itemno" label="实验项目编号最后两位" name="itemno">
			<a-input v-model:value="formExperimentitem.itemno" />
		</a-form-item>
		<a-form-item ref="itemname" label="实验项目名称" name="itemname">
			<a-input v-model:value="formExperimentitem.itemname" />
		</a-form-item>
		<a-form-item label="课程编号" name="courseno">
			<a-select v-model:value="formExperimentitem.courseno" placeholder="please select your zone" @click="getoption">
				Use v-for to iterate through your options
				<a-select-option v-for="option in options" :value="option.value" :key="option.value">
					{{ option.label }}
				</a-select-option>
			</a-select>
		</a-form-item>
		<a-form-item ref="itemhour" label="实验学时" name="itemhour" :rules="[{ type: 'number', min: 0, max: 99 }]">
			<a-input-number v-model:value="formExperimentitem.itemhour"></a-input-number>
		</a-form-item>
		<a-form-item ref="itemcontent" label="实验内容" name="itemcontent">
			<a-textarea v-model:value="formExperimentitem.itemcontent" />
		</a-form-item>
		<a-form-item label="实验类型" name="itemtype">
			<a-radio-group v-model:value="formExperimentitem.itemtype">
				<a-radio value="1">演示</a-radio>
				<a-radio value="2">验证</a-radio>
				<a-radio value="3">综合</a-radio>
				<a-radio value="4">设计研究</a-radio>
			</a-radio-group>
		</a-form-item>
		<a-form-item label="是否必做" name="iscompulsory">
			<a-radio-group v-model:value="formExperimentitem.iscompulsory">
				<a-radio value="1">必做</a-radio>
				<a-radio value="0">选做</a-radio>
			</a-radio-group>
		</a-form-item>
		<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
			<a-button type="primary" @click="onSubmit">Submit</a-button>
			<a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
		</a-form-item>
	</a-form>
</template>
<script lang="ts" setup>
import { ref, reactive, toRaw } from "vue";
import type { UnwrapRef } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { Class } from "@/api/interface";
import * as vueRouter from "vue-router";
import { message } from "ant-design-vue";
const router = vueRouter.useRouter();
import { addExperimentitem, getCourseList } from "@/api/modules/class";
export interface optionsType {
	value: string;
	label: string;
}

const options = ref<optionsType[]>([]);
const getoption = async () => {
	try {
		options.value = [];
		let resultdata = await getCourseList();
		resultdata.data.forEach(item => {
			options.value.push({ value: item.courseno, label: item.coursename });
		});
	} catch (err) {
		console.log(err);
	}
};

const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formExperimentitem: UnwrapRef<Class.Experimentitem> = reactive({
	itemno: "",
	itemname: "",
	courseno: "",
	itemhour: 0,
	itemcontent: "",
	itemtype: 0,
	iscompulsory: 0
});

// 添加简单的校验规则
const rules: Record<string, Rule[]> = {
	courseno: [
		{ required: true, message: "请输入课程编号", trigger: "change" },
		{ min: 12, max: 12, message: "Length should be 12", trigger: "blur" }
	],
	itemno: [
		{ required: true, message: "请输入实验项目编号", trigger: "change" },
		{ min: 2, max: 2, message: "Length should be 2", trigger: "blur" }
	],
	itemname: [{ required: true, message: "请输入实验项目名称", trigger: "change" }],
	itemhour: [{ required: true, message: "请输入学时", trigger: "change" }],
	itemtype: [{ required: true, message: "请选择实验类型", trigger: "change" }],
	experimenttype: [{ required: true, message: "请选择实验类型", trigger: "change" }],
	itemcontent: [{ required: true, message: "请填写实验内容", trigger: "change" }],
	iscompulsory: [{ required: true, message: "请选择实验类型", trigger: "change" }]
};
const onSubmit = () => {
	formRef.value
		.validate()
		.then(async () => {
			formExperimentitem.itemno = formExperimentitem.courseno.slice(-10) + formExperimentitem.itemno;
			const aa = await addExperimentitem(toRaw(formExperimentitem));
			if (aa.code === undefined) {
				message.error("你没有权限添加实验课程");
			} else {
				router.push(`/table/experimentitem`);
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
