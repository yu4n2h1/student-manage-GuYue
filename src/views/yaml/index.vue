<template>
	<a-upload-dragger
		v-model:fileList="fileList"
		name="file"
		:multiple="true"
		:customRequest="customRequest"
		@change="handleChange"
		@drop="handleDrop"
	>
		<p class="ant-upload-drag-icon">
			<inbox-outlined></inbox-outlined>
		</p>
		<p class="ant-upload-text">Click or drag file to this area to upload</p>
		<p class="ant-upload-hint">
			Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
		</p>
	</a-upload-dragger>
</template>
<script lang="ts" setup>
import { ResultData } from "@/api/interface";
import { ref } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { UploadFile } from "ant-design-vue/lib/upload/interface";
import { toUploadFile } from "@/api/modules/class";
import type { UploadChangeParam } from "ant-design-vue";
import { Class } from "@/api/interface";
const fileList = ref([]);
const handleChange = (info: UploadChangeParam) => {
	const status = info.file.status;
	if (status !== "uploading") {
		console.log(info.file, info?.fileList);
	}
	if (status === "done") {
		message.success(`${info.file?.name} file uploaded successfully.`);
	} else if (status === "error") {
		message.error(`${info.file?.name} file upload failed.`);
	}
};

const customRequest = async ({ file, onSuccess, onError }: { file: UploadFile; onSuccess: Function; onError: Function }) => {
	// const formData = new FormData();
	console.log(file);
	try {
		const forData: Class.File = { file: file?.originFileObj };
		const data: ResultData = await toUploadFile(forData);
		console.log(data);
		message.success(`${file.name} file uploaded successfully.`);

		onSuccess();
	} catch (err) {
		onError();
		message.error(`${file.name} file upload failed.`);
	}
};

function handleDrop(e: DragEvent) {
	console.log(e);
}
</script>
