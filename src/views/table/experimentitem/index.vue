<template>
	<a-button class="editable-add-btn" style="margin-bottom: 12px" @click="handleAdd">Add</a-button>
	<a-table bordered :data-source="dataSource" :columns="columns">
		<template #bodyCell="{ column, text, record }">
			<template v-if="column.dataIndex === 'courseno'">
				<div class="editable-cell">
					<div v-if="editableData[record.courseno]" class="editable-cell-input-wrapper">
						<a-input v-model:value="editableData[record.courseno].courseno" />
						<check-outlined class="editable-cell-icon-check" />
					</div>
					<div v-else class="editable-cell-text-wrapper">
						{{ text || " " }}
						<edit-outlined class="editable-cell-icon" />
					</div>
				</div>
			</template>
			<template v-else-if="column.dataIndex === 'operation'">
				<a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.itemno)">
					<a>Delete</a>
				</a-popconfirm>
			</template>
		</template>
	</a-table>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { Ref, UnwrapRef } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { Class } from "@/api/interface";
import { getExperimentitemList, delExperimentitem } from "@/api/modules/class";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
const router = useRouter();

let columns = [
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
		title: "操作",
		dataIndex: "operation"
	}
];

const dataSource: Ref<Class.Experimentitem[]> = ref([]);

const fetchData = async () => {
	try {
		let response = await getExperimentitemList();
		response.data.forEach(item => {
			dataSource.value.push(item);
		});
	} catch (err) {
		console.log(err);
	}
};

fetchData();

const editableData: UnwrapRef<Record<string, Class.Course>> = reactive({});

async function onDelete(key: string) {
	// delCourse();
	const aa = await delExperimentitem({ itemno: key });
	dataSource.value = [];
	if (aa.code === undefined) {
		message.error("你没有权限删除实验课表");
	}
	fetchData();
}
const handleAdd = () => {
	router.push(`/table/experimentitem/formExperimentitem`);
};
</script>
<style lang="less" scoped>
.editable-cell {
	position: relative;
	.editable-cell-input-wrapper,
	.editable-cell-text-wrapper {
		padding-right: 24px;
	}

	.editable-cell-text-wrapper {
		padding: 5px 24px 5px 5px;
	}

	.editable-cell-icon,
	.editable-cell-icon-check {
		position: absolute;
		right: 0;
		width: 20px;
		cursor: pointer;
	}

	.editable-cell-icon {
		margin-top: 4px;
		display: none;
	}

	.editable-cell-icon-check {
		line-height: 28px;
	}

	.editable-cell-icon:hover,
	.editable-cell-icon-check:hover {
		color: #108ee9;
	}

	.editable-add-btn {
		margin-bottom: 8px;
	}
}
.editable-cell:hover .editable-cell-icon {
	display: inline-block;
}
</style>
