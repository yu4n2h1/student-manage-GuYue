<template>
	<a-table :columns="columns" :data-source="dataSource" :pagination="pagination">
		<template #bodyCell="{ column, text }">
			<template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
		</template>
	</a-table>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { Class } from "@/api/interface";
import type { Ref } from "vue";
import { getUnion } from "@/api/modules/class";
const loading = ref(true);

const columns = [
	{
		title: "实验项目编号",
		dataIndex: "itemno"
	},
	{
		title: "实验项目名称",
		dataIndex: "itemname"
	},
	{
		title: "课程编号",
		dataIndex: "courseno"
	},
	{
		title: "实验学时",
		dataIndex: "itemhour"
	},
	{
		title: "实验内容",
		dataIndex: "itemcontent"
	},
	{
		title: "实验类型",
		dataIndex: "itemtype",
		customRender: (data: { text: number }) => {
			// console.log(text.text);
			const text = data.text;
			if (text === 1) {
				return "演示";
			} else if (text === 2) {
				return "验证";
			} else if (text === 3) {
				return "综合";
			} else if (text === 4) {
				return "设计研究";
			}
		}
	},
	{
		title: "是否必做",
		dataIndex: "iscompulsory",
		customRender: (data: { text: number }) => {
			const text = data.text;
			if (text === 1) {
				return "必做";
			} else if (text === 0) {
				return "选做";
			}
		}
	},
	{
		title: "课程号",
		dataIndex: "courseno",
		sorter: true
	},
	{
		title: "课程名称",
		dataIndex: "coursename"
	},
	{
		title: "学分",
		dataIndex: "credit"
	},
	{
		title: "学时",
		dataIndex: "credithour"
	},
	{
		title: "课程类型",
		dataIndex: "coursetype",
		customRender: (data: { text: number }) => {
			const text = data.text;
			if (text === 1) {
				return "必修";
			} else if (text == 2) {
				return "选修";
			}
		}
	},
	{
		title: "实验方式",
		dataIndex: "experimenttype",
		customRender: (data: { text: number }) => {
			const text = data.text;
			console.log(text);
			if (text === 1) {
				return "单开实验";
			} else if (text == 2) {
				return "课内实验";
			}
		}
	},
	{
		title: "描述",
		dataIndex: "description"
	},
	{
		title: "操作",
		dataIndex: "operation"
	}
];
const pagination = computed(() => ({
	total: 25,
	pageSize: 25
}));

const dataSource: Ref<Class.union[]> = ref([]);
const fetchData = async () => {
	try {
		// loading.value = true;
		const response = await getUnion();

		response.data.forEach(item => {
			dataSource.value.push(item);
		});
		loading.value = false;
	} catch (err) {
		console.log(err);
	} finally {
		console.log("页面定制");
		loading.value = false;
	}
};
fetchData();
console.log(dataSource.value);
loading.value = false;
</script>
