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
				<a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.courseno)">
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
import { getCourseList } from "@/api/modules/class";
import { delCourse } from "@/api/modules/class";
import { useRouter } from "vue-router";
const router = useRouter();
import { message } from "ant-design-vue";

const columns = [
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
		_customRender: (data: { text: number }) => {
			const text = data.text;
			if (text === 1) {
				return "必修";
			} else if (text == 2) {
				return "选修";
			}
		},
		get customRender() {
			return this._customRender;
		},
		set customRender(value) {
			this._customRender = value;
		}
	},
	{
		title: "实验方式",
		dataIndex: "experimenttype",
		_customRender_1: (data: { text: number }) => {
			const text = data.text;
			console.log(text);
			if (text === 1) {
				return "单开实验";
			} else if (text == 2) {
				return "课内实验";
			}
		},
		get customRender() {
			return this._customRender_1;
		},
		set customRender(value) {
			this._customRender_1 = value;
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
const dataSource: Ref<Class.Course[]> = ref([]);

const fetchData = async () => {
	try {
		let response = await getCourseList();
		response.data.forEach(item => {
			dataSource.value.push(item);
		});
	} catch (err) {
		console.log(err);
	}
};

fetchData();
// console.log(dataSource);

const editableData: UnwrapRef<Record<string, Class.Course>> = reactive({});

const onDelete = async (key: string) => {
	const aa = await delCourse({ courseno: key });
	if (aa.code === undefined) {
		message.error("你没有权限删除课程");
	}
	dataSource.value = [];
	fetchData();
};
const handleAdd = () => {
	router.push(`/table/course/formCourse`);
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
